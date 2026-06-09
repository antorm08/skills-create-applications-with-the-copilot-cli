#!/usr/bin/env node

/**
 * Supported operations:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 */

function toNumber(value, name) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new TypeError(`${name} must be a valid number.`);
  }

  return parsed;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new RangeError('Cannot divide by zero.');
  }

  return a / b;
}

function resolveOperation(operation) {
  switch (operation) {
    case 'add':
    case '+':
      return add;
    case 'subtract':
    case '-':
      return subtract;
    case 'multiply':
    case '*':
      return multiply;
    case 'divide':
    case '/':
      return divide;
    default:
      throw new Error(
        `Unknown operation "${operation}". Use add, subtract, multiply, or divide.`,
      );
  }
}

function main(argv = process.argv.slice(2)) {
  const [operation, leftValue, rightValue] = argv;

  if (!operation || leftValue === undefined || rightValue === undefined) {
    throw new Error('Usage: node src/calculator.js <operation> <left> <right>');
  }

  const calculate = resolveOperation(operation);
  const left = toNumber(leftValue, 'Left operand');
  const right = toNumber(rightValue, 'Right operand');

  return calculate(left, right);
}

if (require.main === module) {
  try {
    const result = main();
    process.stdout.write(`${result}\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  main,
  resolveOperation,
  toNumber,
};
