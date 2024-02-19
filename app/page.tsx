"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TbArrowsShuffle, TbArrowRight } from "react-icons/tb";
import HomeNumber from "@/app/ui/HomeNumber";

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [hasChanged, setHasChanged] = useState(false);
  const [hasValidRandoms, setHasValidRandoms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minNumber, setMinNumber] = useState<BigInt>();
  const [maxNumber, setMaxNumber] = useState<BigInt>();
  const [number, setNumber] = useState<BigInt>();

  useEffect(() => {
    if (searchParams.get("min"))
      setMinNumber(BigInt(searchParams.get("min") as string));
    if (searchParams.get("max"))
      setMaxNumber(BigInt(searchParams.get("max") as string));
    if (searchParams.get("num"))
      setNumber(BigInt(searchParams.get("num") as string));
  }, []);

  const setInput = (value: string) => {
    setHasChanged(true);
    setNumber(BigInt(value));
  };

  const setMinInput = (value: string) => {
    setMinNumber(BigInt(value));
  };

  const setMaxInput = (value: string) => {
    setMaxNumber(BigInt(value));
  };

  useEffect(() => {
    setHasValidRandoms(
      (minNumber !== null &&
        minNumber !== undefined &&
        maxNumber !== null &&
        maxNumber !== undefined &&
        minNumber < maxNumber) ||
        false,
    );
  }, [minNumber, maxNumber]);

  const generateRandomBigInt = (min: bigint, max: bigint) => {
    const random =
      window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295; // generates a random float between 0 and 1
    return min + BigInt(Math.floor(random * Number(max - min + BigInt(1))));
  };

  const generateRandom = () => {
    if (hasValidRandoms) {
      setHasChanged(true);
      setNumber(generateRandomBigInt(minNumber as bigint, maxNumber as bigint));

      const params = new URLSearchParams(searchParams);
      params.set("min", minNumber?.toString() as string);
      params.set("max", maxNumber?.toString() as string);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!hasChanged || number === null || number === undefined) return;

    setHasChanged(false);
    setIsSubmitting(true);
    const params = new URLSearchParams(searchParams);
    params.set("num", number.toString());
    replace(`${pathname}?${params.toString()}`);
    setTimeout(() => setIsSubmitting(false), 100);
  };

  return (
    <main className="m-2 sm:m-4">
      {!searchParams.get("num") && (
        <section>
          <h1 className="text-center text-xl italic">
            All things math-related can be found here!
          </h1>
          <h2 className="text-center text-sm lowercase text-lighty">
            No ads, no payments, no shady links. Just pure, beautiful math
          </h2>
          <p className="my-2 text-center uppercase text-mid">
            (want specific tools? check the math fields)
          </p>
        </section>
      )}
      <HomeNumber search={searchParams} />
      <section className="relative">
        <form
          className="fixed bottom-[5.5rem] left-2 right-2 grid grid-cols-5 gap-2 text-lg sm:bottom-4 sm:left-32 sm:right-4 sm:gap-3 lg:grid-cols-7"
          onSubmit={handleSubmit}
        >
          <input
            type="number"
            value={
              minNumber !== null && minNumber !== undefined
                ? minNumber.toString()
                : ""
            }
            onChange={(e) => setMinInput(e.target.value)}
            className="col-span-2 rounded bg-mid text-center uppercase text-light placeholder:italic placeholder:text-lighty focus:outline focus:outline-1 focus:outline-primary lg:col-span-3"
            placeholder="min random"
          />
          <input
            type="number"
            value={
              maxNumber !== null && maxNumber !== undefined
                ? maxNumber.toString()
                : ""
            }
            onChange={(e) => setMaxInput(e.target.value)}
            className="col-span-2 rounded bg-mid text-center uppercase text-light placeholder:italic placeholder:text-lighty focus:outline focus:outline-1 focus:outline-primary lg:col-span-3"
            placeholder="max random"
          />
          <button
            className={clsx(
              "pointer-events-none flex items-center justify-center rounded-full bg-mid px-3 uppercase transition-colors active:bg-white",
              {
                "pointer-events-auto bg-primary text-dark": hasValidRandoms,
              },
              { "text-lighty": !hasValidRandoms },
            )}
            type="button"
            onClick={generateRandom}
          >
            <TbArrowsShuffle />
          </button>
          <input
            type="number"
            value={
              number !== null && number !== undefined ? number.toString() : ""
            }
            onChange={(e) => setInput(e.target.value)}
            className="col-span-4 rounded bg-mid text-center text-2xl uppercase text-light placeholder:italic placeholder:text-lighty focus:outline focus:outline-1 focus:outline-primary lg:col-span-6"
            placeholder="Input a number"
          />
          <button
            className={clsx(
              "pointer-events-none flex items-center justify-center rounded-full bg-mid px-3 text-2xl uppercase transition-colors",
              {
                "pointer-events-auto bg-primary text-dark": hasChanged,
              },
              { "bg-white text-dark": isSubmitting },
              { "text-lighty": !hasChanged && !isSubmitting },
            )}
            type="submit"
          >
            <TbArrowRight />
          </button>
        </form>
      </section>
    </main>
  );
}
