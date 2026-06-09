const test = require('node:test');
const assert = require('node:assert/strict');

const calculator = require('../calculator');

test('adds numbers', () => {
  assert.equal(calculator.add(2, 3), 5);
  assert.equal(calculator.add(-4, 9), 5);
});

test('subtracts numbers', () => {
  assert.equal(calculator.subtract(10, 4), 6);
  assert.equal(calculator.subtract(-2, -8), 6);
});

test('multiplies numbers', () => {
  assert.equal(calculator.multiply(45, 2), 90);
  assert.equal(calculator.multiply(-3, 5), -15);
});

test('divides numbers', () => {
  assert.equal(calculator.divide(20, 5), 4);
  assert.equal(calculator.divide(7, 2), 3.5);
});

test('throws when dividing by zero', () => {
  assert.throws(() => calculator.divide(8, 0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.',
  });
});

test('resolves supported operations', () => {
  assert.equal(calculator.resolveOperation('add'), calculator.add);
  assert.equal(calculator.resolveOperation('+'), calculator.add);
  assert.equal(calculator.resolveOperation('subtract'), calculator.subtract);
  assert.equal(calculator.resolveOperation('-'), calculator.subtract);
  assert.equal(calculator.resolveOperation('multiply'), calculator.multiply);
  assert.equal(calculator.resolveOperation('*'), calculator.multiply);
  assert.equal(calculator.resolveOperation('divide'), calculator.divide);
  assert.equal(calculator.resolveOperation('/'), calculator.divide);
});

test('throws for unknown operations', () => {
  assert.throws(() => calculator.resolveOperation('mod'), {
    message: /Unknown operation "mod"/,
  });
});

test('converts numeric input', () => {
  assert.equal(calculator.toNumber('12', 'Operand'), 12);
  assert.equal(calculator.toNumber('3.5', 'Operand'), 3.5);
});

test('throws for invalid numeric input', () => {
  assert.throws(() => calculator.toNumber('abc', 'Operand'), {
    name: 'TypeError',
    message: 'Operand must be a valid number.',
  });
});

test('runs the CLI calculation flow', () => {
  assert.equal(calculator.main(['add', '2', '3']), 5);
  assert.equal(calculator.main(['subtract', '10', '4']), 6);
  assert.equal(calculator.main(['multiply', '45', '2']), 90);
  assert.equal(calculator.main(['divide', '20', '5']), 4);
});

test('requires a full CLI argument set', () => {
  assert.throws(() => calculator.main(['add', '2']), {
    message: 'Usage: node src/calculator.js <operation> <left> <right>',
  });
});
