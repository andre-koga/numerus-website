import { useEffect, useState } from "react";
import { HomeToolNode } from "@/app/lib/types";

const Collatz: HomeToolNode = (value) => {
  const [seq, setSeq] = useState<bigint[]>([]);

  const collatz = (n: bigint, limit: boolean) => {
    let sequence = [n];
    while (n !== 1n && (!limit || sequence.length < 25)) {
      if (n % 2n === 0n) {
        n /= 2n;
      } else {
        n = 3n * n + 1n;
      }
      sequence.push(n);
    }
    setSeq(sequence);
  };

  useEffect(() => {
    collatz(value, true);
  }, [, value]);

  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  return (
    <>
      <p className="m-2 text-justify text-sm">
        {seq.join(", ") + (seq[seq.length - 1] === 1n ? "" : "...")}
      </p>
      {seq[seq.length - 1] !== 1n && (
        <div className="grid">
          <button
            onClick={() => collatz(value, false)}
            className="mt-3 rounded-full border border-mid px-2 py-0.5 text-xs text-light transition-colors hover:bg-mid"
          >
            show all
          </button>
        </div>
      )}
    </>
  );
};

export default Collatz;
