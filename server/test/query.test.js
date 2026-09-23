import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseIdsQuery, parseListQuery } from '../src/utils/query.js';
import { getTokenFromHeader } from '../src/middleware/auth.js';

describe('parseListQuery', () => {
  it('returns defaults for empty query', () => {
    const result = parseListQuery({}, { allowedSort: ['createdAt'], defaultSort: 'createdAt' });
    assert.equal(result.start, 0);
    assert.equal(result.limit, 10);
    assert.equal(result.sortField, 'createdAt');
    assert.equal(result.sortOrder, -1);
  });

  it('parses pagination and ASC order', () => {
    const result = parseListQuery(
      { _start: '10', _end: '20', _sort: 'createdAt', _order: 'ASC' },
      { allowedSort: ['createdAt'], defaultSort: 'createdAt' },
    );
    assert.equal(result.start, 10);
    assert.equal(result.limit, 10);
    assert.equal(result.sortOrder, 1);
  });

  it('caps limit at 100 and falls back on sort injection', () => {
    const result = parseListQuery(
      { _start: '0', _end: '10000', _sort: '$where', _order: 'DESC' },
      { allowedSort: ['createdAt'], defaultSort: 'createdAt' },
    );
    assert.equal(result.limit, 100);
    assert.equal(result.sortField, 'createdAt');
  });

  it('rejects disallowed sort fields', () => {
    const result = parseListQuery(
      { _sort: 'password' },
      { allowedSort: ['createdAt'], defaultSort: 'createdAt' },
    );
    assert.equal(result.sortField, 'createdAt');
  });
});

describe('parseIdsQuery', () => {
  it('parses valid ObjectId array', () => {
    const id = '507f1f77bcf86cd799439011';
    assert.deepEqual(parseIdsQuery(JSON.stringify([id])), [id]);
  });

  it('throws on missing, malformed, or non-ObjectId input', () => {
    assert.throws(() => parseIdsQuery(undefined), /Missing ids/);
    assert.throws(() => parseIdsQuery('not-json'), /Invalid ids/);
    assert.throws(() => parseIdsQuery(JSON.stringify(['not-an-id'])), /Invalid id format/);
    assert.throws(() => parseIdsQuery(JSON.stringify([])), /Invalid ids/);
  });
});

describe('getTokenFromHeader', () => {
  it('extracts Bearer tokens case-insensitively', () => {
    assert.equal(getTokenFromHeader('Bearer abc'), 'abc');
    assert.equal(getTokenFromHeader('bearer xyz'), 'xyz');
  });

  it('returns null for missing or malformed headers', () => {
    assert.equal(getTokenFromHeader(undefined), null);
    assert.equal(getTokenFromHeader('Token abc'), null);
    assert.equal(getTokenFromHeader('Bearer '), null);
  });
});
