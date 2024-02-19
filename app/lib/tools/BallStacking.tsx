import { HomeToolNode } from "@/app/lib/types";

function maxTriangle(n: bigint) {
  let k = BigInt(1);
  let twoN = BigInt(n) * BigInt(2);
  while (k * (k + BigInt(1)) <= twoN) {
    k++;
  }
  return k - BigInt(1);
}

function maxHexagon(n: bigint) {
  let s = BigInt(1);
  while (BigInt(3) * s * (s - BigInt(1)) + BigInt(1) <= n) {
    s++;
  }
  return s - BigInt(1);
}

const BallStacking: HomeToolNode = (value) => {
  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  return (
    <>
      <p className="my-2 text-center text-sm italic text-lighty">
        {value.toString()} balls can stack to form...
      </p>
      <ul className="my-1 gap-2 text-center">
        <li>{`$$\\text{a triangle with ${maxTriangle(
          value,
        ).toString()} rows}$$`}</li>
        <li>{`$$\\text{a hexagon with side length ${maxHexagon(
          value,
        ).toString()}}$$`}</li>
      </ul>
    </>
  );
};

export default BallStacking;
