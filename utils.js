
// ----------------sumOfArray(arr)
function sumOfArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number" || isNaN(arr[i])) {
      return NaN;
    }
    total += arr[i];
  }
  return total;
}
module.exports = { sumOfArray };

console.log(sumOfArray([1, 2, 3, 4])); // Output: 10
console.log(sumOfArray([])); // Output: 0

//-------------------- capitalizeWords(str)

const capitalizeWords = (str) => {
  const words = str.split(" ");

  const capitalizedWords = words.map((word) => {
    if (word.length === 0) {
      return "";
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};

module.exports = { capitalizeWords };

console.log(capitalizeWords("hello world")); // Output: Hello World

//---------- findMax(arr)
function findLargestNumber(numbers) {
  if (numbers.length === 0) {
    return undefined;
  }

  let max = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  return max;
}
 
module.exports {findLargestNumber};

const numbersArray = [11, 7, 24, 2, 8, 55, 1];
const largest = findLargestNumber(numbersArray);
console.log(largest); // Output: 55

// ---countVowels(str)

function countVowels(str) {
  if (!str || typeof str !== "string") {
    return 0;
  }

  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

module.exports {countVowels};

const string = "What are we going to do today";
console.log(countVowels(string));
// Output: 10
