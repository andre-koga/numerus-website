"use client";

import React, { useCallback, useEffect, useState } from "react";
import { HomeToolNode } from "@/app/lib/types";

declare global {
  interface Window {
    MathJax: any;
  }
}

const NeighborPrimes: HomeToolNode = (value) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [primes, setPrimes] = useState<[BigInt, BigInt]>([
    BigInt(0),
    BigInt(0),
  ]);

  const addNewPrime = useCallback((n: [bigint, bigint]) => {
    setPrimes([BigInt(n[0]), BigInt(n[1])]);
  }, []);

  useEffect(() => {
    const worker = new Worker("./workers/neighborPrimes.js");

    worker.onmessage = (event) => {
      if (event.data === -1) {
        setIsCalculating(false);
      } else {
        addNewPrime(event.data);
      }
    };

    setPrimes([BigInt(0), BigInt(0)]);
    worker.postMessage(value);
    setIsCalculating(true);

    return () => {
      worker.terminate();
    };
  }, [value, addNewPrime]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [primes]);

  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  return (
    <>
      {isCalculating && <p className="my-3 text-center">loading...</p>}
      {!isCalculating && (
        <p>
          $${"\\text{"}
          {primes.join(", ")}
          {"}"}$$
        </p>
      )}
    </>
  );
};

export default NeighborPrimes;
