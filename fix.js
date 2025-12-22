//workaround fix for npm errors to use jest until figure out what wrong
/** @type {import('jest').Config} */
const config = {
  verbose: true,
};

module.exports = config;
// -------------------------------------------

const { sumOfArray } = require("./utils.js");
describe("sumOfArray(arr)", () => {
  test("should return 0 for an empty array", () => {
    expect(sumOfArray([])).toBe(0);
  });

  test("should return the correct sum for an array of positive integers", () => {
    expect(sumOfArray([1, 2, 3, 4])).toBe(10);
  });

  test("should return the single element for a single-item array", () => {
    expect(sumOfArray([24])).toBe(24);
  });

  test("should return the correct sum for an array of negative integers", () => {
    expect(sumOfArray([-1, -3, -5])).toBe(-9);
  });

  test("should return the correct sum for an array of mixed positive and negative integers", () => {
    expect(sumOfArray([10, -5, 2, -7])).toBe(0);
  });

  test("should handle arrays containing zeros correctly", () => {
    expect(sumOfArray([0, 0, 0, 5])).toBe(5);
  });

  test("should sum floating-point numbers correctly", () => {
    expect(sumOfArray([1.1, 2.2, 3.3])).toBeCloseTo(6.6, 5);
  });

  test("should throw an error or return 0 for null input", () => {
    expect(() => sumOfArray(null)).toThrow();
  });

  test("should throw an error or return 0 for undefined input", () => {
    expect(() => sumOfArray(undefined)).toThrow();
  });
});
// -------------------------------------------------
const { capitalizeWords } = require("./utils.js");
describe("capitalizeWords", () => {
  test("capitalizes the first letter of each word", () => {
    expect(capitalizeWords("the quick brown fox")).toBe("The Quick Brown Fox");
  });

  test("handles single words", () => {
    expect(capitalizeWords("javascript")).toBe("Javascript");
  });

  test("returns an empty string when input is empty", () => {
    expect(capitalizeWords("")).toBe("");
  });

  test("preserves existing capitalization in the middle of words", () => {
    expect(capitalizeWords("macBook air")).toBe("MacBook Air");
  });

  test("handles strings with multiple spaces", () => {
    expect(capitalizeWords("hello  world")).toBe("Hello  World");
  });
});

// -------------------------------------------------
const { findLargestNumber } = require("./utils.js");
describe("findLargestNumber", () => {
  test("returns the largest number in a standard array", () => {
    expect(findLargestNumber([1, 5, 3, 9, 2])).toBe(9);
  });

  test("returns undefined for an empty array", () => {
    expect(findLargestNumber([])).toBeUndefined();
  });

  test("correctly identifies the largest negative number", () => {
    expect(findLargestNumber([-20, -5, -30])).toBe(-5);
  });

  test("handles arrays with a single element", () => {
    expect(findLargestNumber([100])).toBe(100);
  });

  test("handles decimals correctly", () => {
    expect(findLargestNumber([1.5, 1.8, 1.2])).toBe(1.8);
  });
});

// -------------------------------------------------
const { countVowels } = require("./utils.js");
describe("countVowels", () => {
  test("counts all vowels in a standard string", () => {
    expect(countVowels("Hello World")).toBe(3);
  });
  test("counts lowercase vowels correctly", () => {
    expect(countVowels("hello world")).toBe(3);
  });

  test("is case-insensitive", () => {
    expect(countVowels("AEIOU")).toBe(5);
  });

  test("returns 0 for strings with no vowels", () => {
    expect(countVowels("xyz")).toBe(0);
  });

  test("returns 0 for an empty string", () => {
    expect(countVowels("")).toBe(0);
  });
});
