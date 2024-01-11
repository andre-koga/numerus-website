"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ToolNode } from "@/app/lib/types";

declare global {
  interface Window {
    MathJax: any;
  }
}

const PrimeFinder: ToolNode = (values) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [prime, setPrime] = useState<BigInt>(BigInt(0));

  useEffect(() => {
    const worker = new Worker("./primeFinderWorker.js");

    worker.onmessage = (event) => {
      setPrime(BigInt(event.data));
      setIsCalculating(false);
    };

    setPrime(BigInt(0));
    worker.postMessage(values[0]);
    setIsCalculating(true);

    return () => {
      worker.terminate();
    };
  }, [values]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [prime]);

  return (
    <div className="rounded-full border border-mid">
      {isCalculating && (
        <p className="my-4 text-center italic text-lighty">
          ...finding prime...
        </p>
      )}
      {!isCalculating && <p>$${prime.toString()}$$</p>}
      {/* <p className="my-4 text-center text-sm">
        $$
        {prime.toString() +
          "-" +
          values[0].toString() +
          "=" +
          ((prime as bigint) - (values[0] as bigint)).toString()}
        $$
      </p> */}
    </div>
  );
};

export default PrimeFinder;
