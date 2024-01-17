"use client";

import { FormDropdownInput, FormNumberInput } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { TbArrowRight } from "react-icons/tb";
import clsx from "clsx";

export default function ToolForm({
  shortName,
  inputTypes,
  inputs,
  setInputs,
}: {
  shortName: string;
  inputTypes: Array<FormNumberInput | FormDropdownInput>;
  inputs: BigInt[];
  setInputs: Dispatch<SetStateAction<BigInt[]>>;
}) {
  const [localInputs, setLocalInputs] = useState<BigInt[]>(inputs);
  const [hasChanged, setHasChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!hasChanged) return;

    setHasChanged(false);
    setIsSubmitting(true);
    setInputs(localInputs);
    const params = new URLSearchParams(searchParams);
    params.set(shortName, localInputs.join(","));
    replace(`${pathname}?${params.toString()}`);
    setTimeout(() => setIsSubmitting(false), 100);
  };

  const setInput = (index: number, value: string) => {
    setHasChanged(true);
    const newInputs = [...localInputs];
    newInputs[index] = BigInt(value);
    setLocalInputs(newInputs);
  };

  return (
    <form className="mt-4 flex gap-3 text-lg" onSubmit={handleSubmit}>
      {inputTypes.map((inputType, i) => {
        switch (inputType.type) {
          case "number":
            return (
              <input
                key={i}
                type="number"
                value={localInputs[i].toString()}
                onChange={(e) => setInput(i, e.target.value)}
                className="flex-grow rounded bg-mid text-center uppercase text-light placeholder:italic placeholder:text-lighty focus:outline focus:outline-1 focus:outline-primary"
                placeholder="Input a number"
                title={inputType.tooltip}
              />
            );
          case "dropdown":
            return (
              <select
                key={i}
                value="dropdown test"
                onChange={(e) => setInput(i, e.target.value)}
                className="flex-grow rounded bg-mid text-center uppercase text-light placeholder:italic placeholder:text-lighty focus:outline focus:outline-1 focus:outline-primary"
              >
                {inputType.options.map((option, j) => (
                  <option key={j} value={j}>
                    {option}
                  </option>
                ))}
              </select>
            );
        }
      })}
      <button
        className={clsx(
          "pointer-events-none flex items-center justify-center rounded-full bg-mid px-4 uppercase transition-colors",
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
  );
}
