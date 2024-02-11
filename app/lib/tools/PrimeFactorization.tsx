"use client";

import React, { useCallback, useEffect, useState } from "react";
import { HomeToolNode } from "@/app/lib/types";

declare global {
  interface Window {
    MathJax: any;
  }
}

const PrimeFactorization: HomeToolNode = (value) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [factors, setFactors] = useState<{ [key: string]: number }>({});

  const addNewFactor = useCallback((n: string) => {
    setFactors((prevFactors) => {
      const newFactors = { ...prevFactors };
      if (newFactors[n]) newFactors[n]++;
      else newFactors[n] = 1;
      return newFactors;
    });
  }, []);

  const amountOfDivisors = () => {
    let divisors = 1;
    Object.keys(factors).forEach((factor) => {
      divisors *= factors[factor] + 1;
    });
    return divisors;
  };

  useEffect(() => {
    const worker = new Worker("./workers/primeFactorization.js");

    worker.onmessage = (event) => {
      if (event.data === -1) {
        setIsCalculating(false);
      } else {
        addNewFactor(event.data.toString());
      }
    };

    setFactors({});
    worker.postMessage(value);
    setIsCalculating(true);

    return () => {
      worker.terminate();
    };
  }, [value, addNewFactor]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [factors]);

  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  return (
    <>
      {isCalculating && (
        <p className="text-center italic text-lighty">
          {Object.entries(factors)
            .map((factor) => factor[0] + "^" + factor[1] + "")
            .join(" * ")}
          ...
        </p>
      )}
      {!isCalculating && (
        <>
          <p>
            $$
            {Object.entries(factors)
              .map(
                (factor) =>
                  factor[0] + (factor[1] > 1 ? "^{" + factor[1] + "}" : ""),
              )
              .join("\\cdot")}
            $$
          </p>
          <p className="text-center text-sm">
            $${"\\text{"}
            {factors[0] || factors[1]
              ? "no"
              : Object.entries(factors).length}{" "}
            distinct prime factor
            {Object.entries(factors).length != 1 ? "s" : ""}
            {"}"}$$
          </p>
          <p className="text-center text-sm">{`$$\\text{${amountOfDivisors()} divisor${
            amountOfDivisors() != 1 ? "s" : "s"
          }}$$`}</p>
        </>
      )}
    </>
  );
};

export default PrimeFactorization;
