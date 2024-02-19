import { HomeToolNode } from "../types";
import sqrt from "./sqrt";

const isPerfectSquare = (num: bigint) => {
  const root = sqrt(num);
  return root * root === num;
};

const fibonacci = (num: bigint) => {
  return (
    num === 0n ||
    isPerfectSquare(5n * num * num + 4n) ||
    isPerfectSquare(5n * num * num - 4n)
  );
};

const SequenceChecker: HomeToolNode = (value) => {
  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  const checkSequences = (num: bigint) => {
    const sequences: string[] = [];

    if (fibonacci(num)) sequences.push("Fibonacci");

    return sequences.join(", ");
  };

  if (checkSequences(value) === "") {
    return (
      <>
        <p className="my-2 text-center text-sm italic text-lighty">
          this is a boring number!
        </p>
        <p className="my-2 text-center text-sm italic text-lighty">
          ...or is it? check{" "}
          <a
            target="_blank"
            className="underline underline-offset-2"
            href={`https://oeis.org/search?q=${value.toString()}&language=english&go=Search`}
          >
            OEIS
          </a>
        </p>
      </>
    );
  }

  return (
    <>
      <p className="my-2 text-sm">Sequences that contain this number:</p>
      <ul>
        <li>{`$$\\text{${checkSequences(value)}}$$`}</li>
      </ul>
      <p className="my-2 text-center text-sm italic text-lighty">
        still want more? check{" "}
        <a
          target="_blank"
          className="underline underline-offset-2"
          href={`https://oeis.org/search?q=${value.toString()}&language=english&go=Search`}
        >
          OEIS
        </a>
      </p>
    </>
  );
};

export default SequenceChecker;
