import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { escapeRegExp } from '../src/utils/query.js';
import { validate } from '../src/middleware/validate.js';
import { body, validationResult } from 'express-validator';

describe('escapeRegExp', () => {
  it('escapes regex metacharacters', () => {
    assert.equal(escapeRegExp('a+b(c).*'), 'a\\+b\\(c\\)\\.\\*');
    assert.equal(escapeRegExp('plain'), 'plain');
  });

  it('neutralises $where-style injection payloads', () => {
    const payload = 'x"; return true; //';
    const re = new RegExp(escapeRegExp(payload));
    assert.equal(re.test(payload), true);
    assert.equal(re.test('anything else'), false);
  });
});

describe('validate middleware', () => {
  const runChain = async (chain, bodyData) => {
    const req = { body: bodyData, params: {}, query: {} };
    for (const mw of chain) {
      await mw(req, {}, () => {});
    }
    return validationResult(req);
  };

  it('passes valid input', async () => {
    const result = await runChain(
      [body('email').isEmail()],
      { email: 'john@example.com' },
    );
    assert.equal(result.isEmpty(), true);
  });

  it('returns 400 with field errors on invalid input', async () => {
    const req = { body: { email: 'not-an-email' }, params: {}, query: {} };
    await body('email').isEmail().withMessage('valid email is required')(req, {}, () => {});
    let status = null;
    let payload = null;
    const res = {
      status: (s) => { status = s; return res; },
      json: (p) => { payload = p; return res; },
    };
    let nextCalled = false;
    validate(req, res, () => { nextCalled = true; });
    assert.equal(status, 400);
    assert.equal(payload.message, 'Validation failed');
    assert.equal(payload.errors[0].field, 'email');
    assert.equal(nextCalled, false);
  });

  it('calls next() when input is valid', async () => {
    const req = { body: {}, params: {}, query: {} };
    let nextCalled = false;
    validate(req, {}, () => { nextCalled = true; });
    assert.equal(nextCalled, true);
  });
});
