// Karnataka Police Department
// SQL Query Parser and Simulator for Client-Side Relational Execution
import { tablesData } from '../data/police_db';

export interface SQLResult {
  columns: string[];
  rows: Record<string, any>[];
  executionTimeMs: number;
  queryType: string;
}

export function executeSQL(queryStr: string): SQLResult {
  const startTime = performance.now();
  
  // Basic normalization
  let query = queryStr.trim().replace(/\s+/g, ' ');
  
  // Check if it is a SELECT query
  if (!query.toUpperCase().startsWith('SELECT')) {
    throw new Error('Only SELECT queries are supported in this investigative playground.');
  }

  // Parse SQL Clauses using case-insensitive search
  const selectIdx = 0;
  const fromIdx = indexOfClause(query, 'FROM');
  if (fromIdx === -1) {
    throw new Error("Syntax Error: Missing 'FROM' clause in query.");
  }

  const whereIdx = indexOfClause(query, 'WHERE');
  const orderByIdx = indexOfClause(query, 'ORDER BY');
  const limitIdx = indexOfClause(query, 'LIMIT');

  // Extract Select Columns
  const selectClause = query.substring(selectIdx + 6, fromIdx).trim();
  
  // Extract From Table (along with JOINs)
  let endOfFrom = query.length;
  if (whereIdx !== -1) endOfFrom = whereIdx;
  else if (orderByIdx !== -1) endOfFrom = orderByIdx;
  else if (limitIdx !== -1) endOfFrom = limitIdx;

  const fromClause = query.substring(fromIdx + 4, endOfFrom).trim();

  // Parse From Table and Joins
  const { primaryTable, primaryAlias, joins } = parseFromAndJoins(fromClause);

  // Load Primary Table Dataset
  const tableKey = findTableCaseInsensitive(primaryTable);
  if (!tableKey) {
    throw new Error(`Table '${primaryTable}' not found in the database schema.`);
  }

  const primaryData = tablesData[tableKey];
  if (!primaryData) {
    throw new Error(`Table '${tableKey}' data is empty or not loaded.`);
  }

  // Build Row Contexts
  // Context maps columns to values: e.g. "CaseMaster.CaseMasterID": 1, "c.CaseMasterID": 1, "CaseMasterID": 1
  let contexts: Record<string, any>[] = primaryData.map(row => {
    const ctx: Record<string, any> = {};
    // Add raw row values
    Object.assign(ctx, row);
    // Add qualified row values
    for (const [key, value] of Object.entries(row)) {
      ctx[`${tableKey}.${key}`] = value;
      if (primaryAlias) {
        ctx[`${primaryAlias}.${key}`] = value;
      }
    }
    return ctx;
  });

  // Evaluate JOINs
  joins.forEach(join => {
    const joinedTableKey = findTableCaseInsensitive(join.table);
    if (!joinedTableKey) {
      throw new Error(`Join Table '${join.table}' not found in the database schema.`);
    }
    const joinedData = tablesData[joinedTableKey];
    
    // Perform Inner Join
    const newContexts: Record<string, any>[] = [];
    
    contexts.forEach(leftCtx => {
      joinedData.forEach(rightRow => {
        // Build right context temporary object
        const rightCtx: Record<string, any> = {};
        Object.assign(rightCtx, rightRow);
        for (const [key, value] of Object.entries(rightRow)) {
          rightCtx[`${joinedTableKey}.${key}`] = value;
          if (join.alias) {
            rightCtx[`${join.alias}.${key}`] = value;
          }
        }

        // Check ON condition
        const conditionCtx = { ...leftCtx, ...rightCtx };
        if (evaluateCondition(join.leftOperand, join.operator, join.rightOperand, conditionCtx)) {
          newContexts.push(conditionCtx);
        }
      });
    });

    contexts = newContexts;
  });

  // Process WHERE filters
  if (whereIdx !== -1) {
    let endOfWhere = query.length;
    if (orderByIdx !== -1) endOfWhere = orderByIdx;
    else if (limitIdx !== -1) endOfWhere = limitIdx;

    const whereClause = query.substring(whereIdx + 5, endOfWhere).trim();
    contexts = contexts.filter(ctx => evaluateWhere(whereClause, ctx));
  }

  // Process ORDER BY
  if (orderByIdx !== -1) {
    let endOfOrderBy = query.length;
    if (limitIdx !== -1) endOfOrderBy = limitIdx;

    const orderByClause = query.substring(orderByIdx + 8, endOfOrderBy).trim();
    contexts = sortContexts(contexts, orderByClause);
  }

  // Process LIMIT
  if (limitIdx !== -1) {
    const limitClause = query.substring(limitIdx + 5).trim();
    const limitNum = parseInt(limitClause, 10);
    if (!isNaN(limitNum)) {
      contexts = contexts.slice(0, limitNum);
    }
  }

  // Project Columns (SELECT columns)
  const resultRows: Record<string, any>[] = [];
  let resultColumns: string[] = [];

  const colItems = parseSelectColumns(selectClause);

  if (colItems.length === 1 && colItems[0].name === '*') {
    // Select all columns from primary table + join tables (without alias prefixes if possible, or keep all base attributes)
    if (contexts.length > 0) {
      // Collect all keys that don't contain '.' (to keep standard simple column names)
      resultColumns = Object.keys(contexts[0]).filter(k => !k.includes('.'));
      contexts.forEach(ctx => {
        const row: Record<string, any> = {};
        resultColumns.forEach(col => {
          row[col] = ctx[col];
        });
        resultRows.push(row);
      });
    } else {
      resultColumns = Object.keys(primaryData[0] || {});
    }
  } else {
    // Project selected columns
    resultColumns = colItems.map(item => item.alias || item.name);
    contexts.forEach(ctx => {
      const row: Record<string, any> = {};
      colItems.forEach(item => {
        let val = ctx[item.name];
        // If not found directly, try case-insensitive resolution of columns in ctx
        if (val === undefined) {
          const matchingKey = Object.keys(ctx).find(k => k.toLowerCase() === item.name.toLowerCase());
          if (matchingKey) val = ctx[matchingKey];
        }
        row[item.alias || item.name] = val !== undefined ? val : null;
      });
      resultRows.push(row);
    });
  }

  const endTime = performance.now();

  return {
    columns: resultColumns,
    rows: resultRows,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(2)),
    queryType: joins.length > 0 ? `SELECT with ${joins.length} JOIN(s)` : 'SELECT (Simple)'
  };
}

// Helper to find index of a keyword clause (e.g. FROM, WHERE) outside quotes
function indexOfClause(query: string, clause: string): number {
  const regex = new RegExp(`\\b${clause}\\b`, 'i');
  const match = query.match(regex);
  return match && match.index !== undefined ? match.index : -1;
}

function findTableCaseInsensitive(tableName: string): string | null {
  const target = tableName.toLowerCase().trim();
  const keys = Object.keys(tablesData);
  const match = keys.find(k => k.toLowerCase() === target);
  return match || null;
}

// Parses select column clauses: "c.CaseNo, comp.ComplainantName AS Name"
function parseSelectColumns(clause: string): { name: string; alias: string | null }[] {
  if (clause.trim() === '*') {
    return [{ name: '*', alias: null }];
  }

  const parts: { name: string; alias: string | null }[] = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < clause.length; i++) {
    const char = clause[i];
    if ((char === "'" || char === '"' || char === '`') && (i === 0 || clause[i - 1] !== '\\')) {
      if (inQuotes && char === quoteChar) {
        inQuotes = false;
      } else if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      }
    }

    if (char === ',' && !inQuotes) {
      parts.push(parseColPart(current));
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    parts.push(parseColPart(current));
  }

  return parts;
}

function parseColPart(part: string): { name: string; alias: string | null } {
  const trimmed = part.trim();
  const asMatch = trimmed.match(/(.+)\s+AS\s+(.+)/i);
  if (asMatch) {
    return {
      name: asMatch[1].trim().replace(/[`'"[\]]/g, ''),
      alias: asMatch[2].trim().replace(/[`'"[\]]/g, '')
    };
  }

  // Handle space-based alias e.g., "table.col alias"
  const spaceIdx = trimmed.lastIndexOf(' ');
  if (spaceIdx !== -1) {
    const name = trimmed.substring(0, spaceIdx).trim().replace(/[`'"[\]]/g, '');
    const alias = trimmed.substring(spaceIdx + 1).trim().replace(/[`'"[\]]/g, '');
    const keywords = ['AND', 'OR', 'ON', 'IN', 'JOIN', 'LEFT', 'RIGHT', 'INNER'];
    if (!keywords.includes(alias.toUpperCase())) {
      return { name, alias };
    }
  }

  return {
    name: trimmed.replace(/[`'"[\]]/g, ''),
    alias: null
  };
}

// Parses FROM clauses including joins: "CaseMaster c JOIN ComplainantDetails comp ON c.CaseMasterID = comp.CaseMasterID"
interface JoinInfo {
  table: string;
  alias: string | null;
  leftOperand: string;
  operator: string;
  rightOperand: string;
}

function parseFromAndJoins(clause: string): { primaryTable: string; primaryAlias: string | null; joins: JoinInfo[] } {
  const parts = clause.split(/\bJOIN\b/i);
  const primaryPart = parts[0].trim();
  
  // Parse Primary Table & Alias
  const primaryTableParts = primaryPart.split(/\s+/);
  const primaryTable = primaryTableParts[0].replace(/[`'"[\]]/g, '');
  let primaryAlias: string | null = null;
  if (primaryTableParts.length > 1) {
    primaryAlias = primaryTableParts[primaryTableParts.length - 1].replace(/[`'"[\]]/g, '');
    if (primaryAlias.toUpperCase() === 'AS') {
      primaryAlias = null;
    } else if (primaryTableParts.length > 2 && primaryTableParts[primaryTableParts.length - 2].toUpperCase() === 'AS') {
      primaryAlias = primaryTableParts[primaryTableParts.length - 1].replace(/[`'"[\]]/g, '');
    }
  }

  const joins: JoinInfo[] = [];

  for (let i = 1; i < parts.length; i++) {
    const joinPart = parts[i].trim();
    // Split by ON
    const onSplit = joinPart.split(/\bON\b/i);
    if (onSplit.length < 2) {
      throw new Error("Syntax Error: JOIN clause is missing an 'ON' join condition.");
    }
    
    const tableAndAlias = onSplit[0].trim();
    const condition = onSplit[1].trim();

    const tableParts = tableAndAlias.split(/\s+/);
    const table = tableParts[0].replace(/[`'"[\]]/g, '');
    let alias: string | null = null;
    if (tableParts.length > 1) {
      alias = tableParts[tableParts.length - 1].replace(/[`'"[\]]/g, '');
      if (alias.toUpperCase() === 'AS') {
        alias = null;
      } else if (tableParts.length > 2 && tableParts[tableParts.length - 2].toUpperCase() === 'AS') {
        alias = tableParts[tableParts.length - 1].replace(/[`'"[\]]/g, '');
      }
    }

    // Parse ON condition: "c.CaseMasterID = comp.CaseMasterID"
    const condMatch = condition.match(/(.+?)\s*([=<>]|!=|<=|>=)\s*(.+)/);
    if (!condMatch) {
      throw new Error(`Syntax Error: Unsupported JOIN condition '${condition}'. Use table1.col = table2.col format.`);
    }

    joins.push({
      table,
      alias,
      leftOperand: condMatch[1].trim().replace(/[`'"[\]]/g, ''),
      operator: condMatch[2].trim(),
      rightOperand: condMatch[3].trim().split(/\s+/)[0].replace(/[`'"[\]]/g, '') // strip trailing keywords
    });
  }

  return { primaryTable, primaryAlias, joins };
}

// Evaluate single join matching condition
function evaluateCondition(left: string, op: string, right: string, context: Record<string, any>): boolean {
  const leftVal = resolveValue(left, context);
  const rightVal = resolveValue(right, context);
  
  if (op === '=') return String(leftVal) === String(rightVal);
  if (op === '!=') return String(leftVal) !== String(rightVal);
  if (op === '>') return Number(leftVal) > Number(rightVal);
  if (op === '<') return Number(leftVal) < Number(rightVal);
  if (op === '>=') return Number(leftVal) >= Number(rightVal);
  if (op === '<=') return Number(leftVal) <= Number(rightVal);
  return false;
}

// Parses WHERE clause filters: "cstype = 'A' AND AgeYear > 50"
function evaluateWhere(clause: string, context: Record<string, any>): boolean {
  // Support logical AND
  const conditionStrings = clause.split(/\bAND\b/i);
  return conditionStrings.every(condStr => {
    const trimmedCond = condStr.trim();
    
    // Match IS NULL / IS NOT NULL
    const isNotNullMatch = trimmedCond.match(/(.+?)\s+IS\s+NOT\s+NULL/i);
    if (isNotNullMatch) {
      const val = resolveValue(isNotNullMatch[1].trim(), context);
      return val !== null && val !== undefined;
    }
    const isNullMatch = trimmedCond.match(/(.+?)\s+IS\s+NULL/i);
    if (isNullMatch) {
      const val = resolveValue(isNullMatch[1].trim(), context);
      return val === null || val === undefined;
    }

    // Match LIKE
    const likeMatch = trimmedCond.match(/(.+?)\s+LIKE\s+(.+)/i);
    if (likeMatch) {
      const col = likeMatch[1].trim().replace(/[`'"[\]]/g, '');
      const pattern = likeMatch[2].trim().replace(/['"]/g, ''); // strip single/double quotes
      const val = String(resolveValue(col, context) || '');
      
      // Convert SQL LIKE syntax to regex: % -> .* , _ -> .
      const escapedPattern = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
      const regexStr = '^' + escapedPattern.replace(/%/g, '.*').replace(/_/g, '.') + '$';
      const regex = new RegExp(regexStr, 'i');
      return regex.test(val);
    }

    // Match comparative operators
    const compMatch = trimmedCond.match(/(.+?)\s*(=|!=|<>|<=|>=|<|>)\s*(.+)/);
    if (!compMatch) {
      // Evaluate columns that are bits / booleans directly
      const val = resolveValue(trimmedCond, context);
      return val === 1 || val === true || String(val).toLowerCase() === 'true';
    }

    const col = compMatch[1].trim().replace(/[`'"[\]]/g, '');
    const op = compMatch[2].trim();
    let valStr = compMatch[3].trim();
    
    // Strip quotes from literal values
    if ((valStr.startsWith("'") && valStr.endsWith("'")) || (valStr.startsWith('"') && valStr.endsWith('"'))) {
      valStr = valStr.substring(1, valStr.length - 1);
    }

    const colVal = resolveValue(col, context);

    if (op === '=') return String(colVal) === valStr;
    if (op === '!=' || op === '<>') return String(colVal) !== valStr;
    
    // Numeric comparisons
    const numColVal = Number(colVal);
    const numVal = Number(valStr);
    if (!isNaN(numColVal) && !isNaN(numVal)) {
      if (op === '>') return numColVal > numVal;
      if (op === '<') return numColVal < numVal;
      if (op === '>=') return numColVal >= numVal;
      if (op === '<=') return numColVal <= numVal;
    }

    return false;
  });
}

function resolveValue(token: string, context: Record<string, any>): any {
  // If numeric literal
  if (/^\d+(\.\d+)?$/.test(token)) {
    return Number(token);
  }
  // If string literal in quotes
  if ((token.startsWith("'") && token.endsWith("'")) || (token.startsWith('"') && token.endsWith('"'))) {
    return token.substring(1, token.length - 1);
  }
  // If boolean
  if (token.toLowerCase() === 'true') return 1;
  if (token.toLowerCase() === 'false') return 0;
  if (token.toLowerCase() === 'null') return null;

  // Resolve column from context (check direct key match)
  const normalizedToken = token.replace(/[`'"[\]]/g, '');
  if (context[normalizedToken] !== undefined) {
    return context[normalizedToken];
  }

  // Try case-insensitive matching of key
  const matchingKey = Object.keys(context).find(k => k.toLowerCase() === normalizedToken.toLowerCase());
  if (matchingKey) {
    return context[matchingKey];
  }

  // Try parsing without alias prefix, e.g. "c.CaseMasterID" -> check if "CaseMasterID" exists in context
  const dotIdx = normalizedToken.indexOf('.');
  if (dotIdx !== -1) {
    const subCol = normalizedToken.substring(dotIdx + 1);
    if (context[subCol] !== undefined) {
      return context[subCol];
    }
  }

  return null;
}

// Sorts row contexts: "c.AgeYear DESC" or "CaseNo ASC"
function sortContexts(contexts: Record<string, any>[], orderByClause: string): Record<string, any>[] {
  const parts = orderByClause.trim().split(/\s+/);
  const col = parts[0].replace(/[`'"[\]]/g, '');
  const dir = parts.length > 1 ? parts[1].toUpperCase() : 'ASC';

  return [...contexts].sort((a, b) => {
    let valA = resolveValue(col, a);
    let valB = resolveValue(col, b);

    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;

    let comparison = 0;
    if (typeof valA === 'number' && typeof valB === 'number') {
      comparison = valA - valB;
    } else {
      comparison = String(valA).localeCompare(String(valB));
    }

    return dir === 'DESC' ? -comparison : comparison;
  });
}
