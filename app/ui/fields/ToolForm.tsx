"use client";

import { FormDropdownInput, FormNumberInput } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";

export default function ToolForm({
  shortName,
  inputTypes,
  inputs,
  setInputs,
}: {
  shortName: string;
  inputTypes: Array<FormNumberInput | FormDropdownInput>;
  inputs: number[];
  setInputs: Dispatch<SetStateAction<number[]>>;
}) {
  const [localInputs, setLocalInputs] = useState<number[]>(inputs);
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

  const setInput = (index: number, value: number) => {
    setHasChanged(true);
    const newInputs = [...inputs];
    newInputs[index] = Math.max(
      Math.min(value, Number.MAX_SAFE_INTEGER),
      Number.MIN_SAFE_INTEGER,
    );
    setLocalInputs(newInputs);
  };

  return (
    <form className="mt-4 flex text-lg" onSubmit={handleSubmit}>
      <button
        className={clsx(
          "pointer-events-none mr-3 rounded-full bg-mid px-3 uppercase transition-colors",
          {
            "pointer-events-auto bg-primary text-dark": hasChanged,
          },
          { "bg-white text-dark": isSubmitting },
          { "text-lighty": !hasChanged && !isSubmitting },
        )}
        type="submit"
      >
        Enter
      </button>
      {inputTypes.map((inputType, i) => {
        switch (inputType.type) {
          case "number":
            return (
              <input
                type="number"
                value={localInputs[i].toString()}
                onChange={(e) => setInput(i, Number(e.target.value))}
                className="flex-grow rounded bg-mid text-center uppercase text-light placeholder:italic placeholder:text-lighty focus:outline focus:outline-1 focus:outline-primary"
                placeholder="Input a number"
                title={inputType.tooltip}
              />
            );
          case "dropdown":
            <select
              value={inputType.options[localInputs[i]]}
              onChange={(e) => setInput(i, Number(e.target.value))}
              className="flex-grow rounded bg-mid text-center uppercase text-light placeholder:italic placeholder:text-lighty focus:outline focus:outline-1 focus:outline-primary"
            >
              {inputType.options.map((option, j) => (
                <option key={j} value={j}>
                  {option}
                </option>
              ))}
            </select>;
        }
      })}
    </form>
  );
}
