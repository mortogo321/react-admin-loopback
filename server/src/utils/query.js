const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const toNonNegativeInt = (value, fallback) => {
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n) || n < 0) return fallback;
  return n;
};

const sanitizeSortField = (field, allowed, fallback) => {
  if (typeof field !== 'string') return fallback;
  // Block Mongo operator injection ($where, $gt, ...) and prototype keys
  if (field.startsWith('$') || field.includes('.') || field.includes('\0')) return fallback;
  if (Array.isArray(allowed) && allowed.length > 0 && !allowed.includes(field)) return fallback;
  return field;
};

export const parseListQuery = (query = {}, { allowedSort = [], defaultSort = 'createdAt' } = {}) => {
  const start = toNonNegativeInt(query._start, 0);
  const rawEnd = toNonNegativeInt(query._end, start + DEFAULT_LIMIT);
  const end = Math.min(Math.max(rawEnd, start), start + MAX_LIMIT);
  const sortField = sanitizeSortField(query._sort, allowedSort, defaultSort);
  const sortOrder = query._order === 'ASC' ? 1 : -1;
  return { start, end, limit: end - start, sortField, sortOrder };
};

export const parseIdsQuery = (ids) => {
  if (!ids || typeof ids !== 'string') throw new Error('Missing ids query parameter');
  let parsed;
  try {
    parsed = JSON.parse(ids);
  } catch {
    throw new Error('Invalid ids query parameter');
  }
  if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('Invalid ids query parameter');
  if (parsed.length > MAX_LIMIT) throw new Error('Too many ids');
  if (!parsed.every((id) => typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id))) {
    throw new Error('Invalid id format');
  }
  return parsed;
};

export const setTotalCount = (res, total) => {
  res.set('X-Total-Count', String(total));
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
};

// Escape user input before embedding it in a $regex query (ReDoS safety).
export const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
