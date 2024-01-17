"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ToolNode } from "@/app/lib/types";

declare global {
  interface Window {
    MathJax: any;
  }
}

const PrimeFinder: ToolNode = (values) => {
  if (values === undefined) {
    return (
      <div className="rounded-full border border-mid">
        <p>something went wrong!</p>
      </div>
    );
  }

  const [isCalculating, setIsCalculating] = useState(false);
  const [primes, setPrimes] = useState<BigInt[]>([]);

  const addNewPrime = useCallback((n: BigInt) => {
    setPrimes((prevPrimes) => {
      const newPrimes = [...prevPrimes, n];
      return newPrimes;
    });
  }, []);

  useEffect(() => {
    const worker = new Worker("./primeFinderWorker.js");

    worker.onmessage = (event) => {
      if (event.data === -1) {
        setIsCalculating(false);
      } else {
        addNewPrime(BigInt(event.data));
      }
    };

    setPrimes([]);
    worker.postMessage([values[0], values[1]]);
    setIsCalculating(true);

    return () => {
      worker.terminate();
    };
  }, [values, addNewPrime]);

  return (
    <div className="rounded border border-mid p-2 px-4 text-justify">
      {isCalculating && (
        <p className="my-4 text-center italic text-lighty">
          {primes.join(",")}...
        </p>
      )}
      {!isCalculating && <p>{primes.join(", ")}</p>}
    </div>
  );
};

export default PrimeFinder;
