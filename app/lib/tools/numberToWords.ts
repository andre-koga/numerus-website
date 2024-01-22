const firstTwenty = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const bases = [
  "",
  "thousand",
  "million",
  "billion",
  "trillion",
  "quadrillion",
  "quintillion",
  "sextillion",
  "septillion",
  "octillion",
  "nonillion",
  "decillion",
  "undecillion",
  "duodecillion",
  "tredecillion",
  "quattuordecillion",
  "quindecillion",
  "sexdecillion",
  "septendecillion",
  "octodecillion",
  "novemdecillion",
  "vigintillion",
];

export default function bigIntToWords(num: bigint) {
  if (num === BigInt(0)) return "zero";

  let result = num < BigInt(0) ? "minus " : "";
  if (num < BigInt(0)) num = -num;

  for (let i = bases.length - 1; i >= 0; i--) {
    const base = BigInt(1000) ** BigInt(i);
    let baseNum = num / base;

    if (baseNum > BigInt(0)) {
      num %= base;
      let baseResult = "";

      const hundreds = Number(baseNum / BigInt(100));
      if (hundreds > 0) {
        baseResult += firstTwenty[hundreds] + " hundred ";
        baseNum %= BigInt(100);
      }

      if (baseNum > BigInt(0) && baseNum < BigInt(20)) {
        baseResult += firstTwenty[Number(baseNum)];
      } else if (baseNum >= BigInt(20)) {
        const tensPlace = Number(baseNum / BigInt(10));
        const onesPlace = Number(baseNum % BigInt(10));
        baseResult += tens[tensPlace] + " " + firstTwenty[onesPlace];
      }

      result += baseResult.trim() + " " + bases[i] + ", ";
    }
  }

  return result.trim().substring(0, result.length - 2);
}
