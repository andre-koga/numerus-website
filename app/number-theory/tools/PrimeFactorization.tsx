"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { ToolNode } from "@/app/lib/types";

declare global {
  interface Window {
    MathJax: any;
  }
}

const PrimeFactorization: ToolNode = (values) => {
  const [factors, setFactors] = useState<{ [key: number]: number }>({});
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const worker = new Worker("./primeFactorizationWorker.js");
    worker.postMessage(values[0]);
    setIsCalculating(true);
    worker.onmessage = (event) => {
      setIsCalculating(false);
      setFactors(event.data);
    };
    return () => {
      worker.terminate();
    };
  }, [values]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [factors]);

  return (
    <>
      <div>
        {isCalculating && (
          <p className="text-center text-sm lowercase italic text-lighty">
            Calculating...
          </p>
        )}
        {!isCalculating && (
          <p>
            $$N=
            {Object.entries(factors)
              .map((factor) => factor[0] + "^{" + factor[1] + "}")
              .join("\\cdot")}
            $$
          </p>
        )}
      </div>
      <Script
        id="MathJax-script"
        async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      />
    </>
  );
};

export default PrimeFactorization;
