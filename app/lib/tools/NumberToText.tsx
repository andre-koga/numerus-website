import { HomeToolNode } from "@/app/lib/types";

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

const NumberToText: HomeToolNode = (value) => {
  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  if (value === BigInt(0))
    return (
      <>
        <p className="my-3 break-words text-center text-2xl text-primary sm:text-3xl md:text-4xl">
          0
        </p>
        <p className="my-1 text-center text-sm">zero</p>
      </>
    );

  let temp = value;
  let result = temp < BigInt(0) ? "minus " : "";
  if (temp < BigInt(0)) temp = -temp;

  for (let i = bases.length - 1; i >= 0; i--) {
    const base = BigInt(1000) ** BigInt(i);
    let baseNum = temp / base;

    if (baseNum > BigInt(0)) {
      temp %= base;
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

  return (
    <>
      <p className="my-3 break-words text-center text-2xl text-primary sm:text-3xl md:text-4xl">
        {value.toLocaleString()}
      </p>
      <p className="my-1 text-center text-sm">
        {result.trim().substring(0, result.length - 2)}
      </p>
    </>
  );
};

export default NumberToText;
