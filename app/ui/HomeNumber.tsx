import { ReadonlyURLSearchParams } from "next/navigation";
import { HomeToolNode } from "@/app/lib/types";
import Script from "next/script";
import PrimeFactorization from "@/app/lib/tools/PrimeFactorization";
import NumberToText from "@/app/lib/tools/NumberToText";
import NeighborPrimes from "@/app/lib/tools/NeighborPrimes";
import Conversions from "@/app/lib/tools/Conversions";
import RomanNumeral from "@/app/lib/tools/RomanNumeral";
import SequenceChecker from "@/app/lib/tools/SequenceChecker";

const functions: {
  name: string;
  info: string;
  tool: HomeToolNode;
}[] = [
  {
    name: "Number to Text",
    info: "Transform a number into its written form.",
    tool: NumberToText,
  },
  {
    name: "Prime Factorization",
    info: "The prime factorization of a number is the product of its prime factors.",
    tool: PrimeFactorization,
  },
  {
    name: "Neighboring Primes",
    info: "Finds the neighboring primes of a number.",
    tool: NeighborPrimes,
  },
  {
    name: "Conversions",
    info: "Converts a number to different bases.",
    tool: Conversions,
  },
  {
    name: "Roman Numeral",
    info: "Transform a number into its roman numeral form.",
    tool: RomanNumeral,
  },
  {
    name: "Sequence Checker",
    info: "Check if a number is part of a sequence.",
    tool: SequenceChecker,
  },
];

export default function HomeNumber({
  search,
}: {
  search: ReadonlyURLSearchParams;
}) {
  const number = search.get("num")
    ? BigInt(search.get("num") as string)
    : undefined;

  if (number === undefined)
    return (
      <section>
        <p className="mt-40 text-center uppercase italic text-lighty">
          INPUT A NUMBER!
        </p>
      </section>
    );

  return (
    <>
      <section className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2">
        {/* <div className="col-span-1 grid gap-2 rounded bg-darky p-3 text-center md:col-span-2">
          <p className="text-xs lowercase italic text-mid">up to 64 digits!</p>
          <p className="break-all text-2xl text-primary sm:text-4xl md:text-5xl lg:text-8xl">
            {number.toLocaleString()}
          </p>
          <p className="italic">{bigIntToWords(number)}</p>
        </div> */}
        <div className="flex flex-col gap-2 sm:gap-4">
          {functions.map((func, i) => {
            if (i < functions.length / 2) {
              return (
                <div key={i} className="rounded bg-darky p-2">
                  <p className="text-sm uppercase text-primary">{func.name}</p>
                  <p className="text-xs text-lighty">{func.info}</p>
                  {func.tool(number)}
                </div>
              );
            }
          })}
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          {functions.map((func, i) => {
            if (i >= functions.length / 2) {
              return (
                <div key={i} className="overflow-hidden rounded bg-darky p-2">
                  <p className="text-sm uppercase text-primary">{func.name}</p>
                  <p className="text-xs text-lighty">{func.info}</p>
                  {func.tool(number)}
                </div>
              );
            }
          })}
        </div>
      </section>
      <Script
        id="MathJax-script"
        async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      />
    </>
  );
}
