"use client";

import { ToolOptionDictionary } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ToolError from "./ToolError";
import clsx from "clsx";

export default function Field({
  children,
  title,
  options,
  currentTools,
}: {
  children?: React.ReactNode;
  title: string;
  options: ToolOptionDictionary;
  currentTools?: string[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const toggleTool = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (currentTools?.includes(slug)) {
      const newTools = currentTools.filter((tool) => tool !== slug).join(",");

      newTools.length > 0
        ? params.set("tool", newTools)
        : params.delete("tool");
    } else {
      const newTools = [...(currentTools || []), slug].join(",");
      params.set("tool", newTools);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const clearTools = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("tool");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <main className="m-4">
      <h1 className="mb-3 text-4xl font-bold uppercase">{title}</h1>
      <nav>
        <ul className="mb-4 flex flex-wrap gap-2 text-sm">
          <li className="rounded-full bg-primary font-bold text-dark">
            <button
              className="px-2 py-1"
              onClick={() => {
                clearTools();
              }}
            >
              <p className="lowercase">reset</p>
            </button>
          </li>
          {Object.entries(options).map(([slug, option], i) => (
            <li
              className={clsx(
                "rounded-full transition-colors",
                {
                  "bg-light font-bold text-dark": currentTools?.includes(slug),
                },
                {
                  "bg-mid hover:bg-lighty hover:text-dark":
                    !currentTools?.includes(slug),
                },
              )}
            >
              <button
                className="px-2 py-1"
                key={i}
                onClick={() => {
                  toggleTool(slug);
                }}
              >
                <p className="lowercase">{option.title}</p>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="grid gap-3 sm:grid-cols-2">
        {currentTools?.map((currentTool, i) => (
          <li key={i}>
            {currentTool in options ? options[currentTool].tool : <ToolError />}
          </li>
        ))}
      </ul>
      {children}
    </main>
  );
}
