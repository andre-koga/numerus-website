"use client";

import { ToolOptionDictionary } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ToolError from "./ToolError";
import clsx from "clsx";
import ToolWrapper from "./ToolWrapper";

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
          {Object.entries(options).map(([slug, option], i) => (
            <li
              key={i}
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
      <ul className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
        {currentTools?.map((currentTool, i) => (
          <li key={i}>
            {currentTool in options ? (
              <ToolWrapper
                title={options[currentTool].title}
                info={options[currentTool].info}
                updatedAt={options[currentTool].date}
                formData={{
                  shortName: options[currentTool].shortName,
                  inputTypes: options[currentTool].inputTypes,
                }}
                toolNode={options[currentTool].tool}
              />
            ) : (
              <ToolError />
            )}
          </li>
        ))}
      </ul>
      {children}
    </main>
  );
}
