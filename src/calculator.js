#!/usr/bin/env node

/**
 * Supported operations:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 * - Modulo
 * - Exponentiation
 * - Square root
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

function modulo(a, b) {
  if (b === 0) {
    throw new RangeError('Cannot take modulo by zero.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new RangeError('Cannot take the square root of a negative number.');
  }

  return Math.sqrt(n);
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
    case 'modulo':
    case '%':
      return modulo;
    case 'power':
    case '^':
      return power;
    case 'squareRoot':
    case 'sqrt':
      return squareRoot;
    default:
      throw new Error(
        `Unknown operation "${operation}". Use add, subtract, multiply, divide, modulo, power, or squareRoot.`,
      );
  }
}

function main(argv = process.argv.slice(2)) {
  const [operation, leftValue, rightValue] = argv;

  if (!operation) {
    throw new Error('Usage: node src/calculator.js <operation> <left> <right>');
  }

  const calculate = resolveOperation(operation);

  if (calculate === squareRoot) {
    if (leftValue === undefined) {
      throw new Error('Usage: node src/calculator.js squareRoot <value>');
    }

    const value = toNumber(leftValue, 'Value');
    return calculate(value);
  }

  if (leftValue === undefined || rightValue === undefined) {
    throw new Error(
      'Usage: node src/calculator.js <operation> <left> <right>',
    );
  }

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
  modulo,
  power,
  squareRoot,
  main,
  resolveOperation,
  toNumber,
};
