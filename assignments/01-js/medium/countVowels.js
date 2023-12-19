/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  str = str.toLowerCase();
  let c = 0;
  for (let i of str) {
    if (vowels.includes(i)) {
      c++;
    }
  }
  return c;
}

module.exports = countVowels;
