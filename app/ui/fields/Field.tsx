"use client";

import { ModuleOptionDictionary } from "@/app/lib/types";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Field({
  children,
  title,
  options,
  currentModule,
}: {
  children?: React.ReactNode;
  title: string;
  options: ModuleOptionDictionary;
  currentModule?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <main className="m-4">
      <h1 className="mb-3 text-4xl font-bold uppercase">{title}</h1>
      <nav>
        <ul className="flex flex-wrap gap-2">
          {Object.entries(options).map(([slug, option], i) => (
            <li className="rounded-full bg-mid px-3 py-1 text-sm uppercase">
              <Link key={i} href={"?module=" + slug}>
                <p>{option.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {currentModule && options[currentModule].module}
      {children}
    </main>
  );
}
