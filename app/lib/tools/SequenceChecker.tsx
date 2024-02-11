import { HomeToolNode } from "../types";

const sqrt = (value: bigint) => {
  if (value < 0n) {
    throw "square root of negative numbers is not supported";
  }

  if (value < 2n) {
    return value;
  }

  function newtonIteration(n: bigint, x0: bigint) {
    const x1 = (n / x0 + x0) >> 1n;
    if (x0 === x1 || x0 === x1 - 1n) {
      return x0;
    }
    return newtonIteration(n, x1);
  }

  return newtonIteration(value, 1n);
};

const isPerfectSquare = (num: bigint) => {
  const root = sqrt(num);
  return root * root === num;
};

const fibonacci = (num: bigint) => {
  return (
    isPerfectSquare(5n * num * num + 4n) || isPerfectSquare(5n * num * num - 4n)
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

  return (
    <>
      <p className="my-2 text-sm">Sequences that contain this number:</p>
      <ul>
        <li>{`$$\\text{${checkSequences(value)}}$$`}</li>
      </ul>
    </>
  );
};

export default SequenceChecker;
