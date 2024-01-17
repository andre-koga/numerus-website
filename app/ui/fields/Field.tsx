"use client";

import { ToolOption } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import ToolWrapper from "./ToolWrapper";
import Link from "next/link";

export default function Field({
  children,
  title,
  options,
  currentTools,
}: {
  children?: React.ReactNode;
  title: string;
  options: ToolOption[];
  currentTools?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const toggleTool = (index: number) => {
    const params = new URLSearchParams(searchParams);
    if (currentTools?.charAt(index) === "1") {
      const newTools =
        currentTools.substring(0, index) +
        "0" +
        currentTools.substring(index + 1);

      params.set("tool", newTools);
    } else if (currentTools) {
      const newTools =
        currentTools.substring(0, index) +
        "1" +
        currentTools.substring(index + 1);

      params.set("tool", newTools);
    } else {
      const newTools =
        Array(index).fill("0").join() +
        "1" +
        Array(options.length - index - 1)
          .fill("0")
          .join();

      params.set("tool", newTools);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const clearTools = () => {
    replace(`${pathname}`);
  };

  return (
    <main className="m-3 sm:m-4">
      <h1 className="mb-3 text-4xl font-bold uppercase">{title}</h1>
      <nav>
        <ul className="mb-4 flex flex-wrap gap-2 text-xs sm:text-sm">
          <li className="rounded-full bg-primary font-bold text-dark transition-colors hover:bg-yellow-200 active:bg-light">
            <button
              className="px-2 py-1"
              onClick={() => {
                clearTools();
              }}
            >
              <p className="lowercase">reset</p>
            </button>
          </li>
          {options.map((option, i) => (
            <li
              key={i}
              className={clsx(
                "rounded-full transition-colors",
                {
                  "bg-light font-bold text-dark":
                    currentTools?.charAt(i) === "1",
                },
                {
                  "bg-mid hover:bg-lighty hover:text-dark":
                    currentTools?.charAt(i) !== "1",
                },
              )}
            >
              <button
                className="px-2 py-1"
                key={i}
                onClick={() => {
                  toggleTool(i);
                }}
              >
                <p className="lowercase">{option.title}</p>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
        {currentTools?.split("").map(
          (currentTool, i) =>
            currentTool === "1" && (
              <li key={i}>
                <ToolWrapper
                  title={options[i].title}
                  info={options[i].info}
                  updatedAt={options[i].date}
                  formData={{
                    shortName: options[i].shortName,
                    inputTypes: options[i].inputTypes,
                  }}
                  toolNode={options[i].tool}
                />
              </li>
            ),
        )}
      </ul>
      {children}
    </main>
  );
}
