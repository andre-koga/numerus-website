import { ReadonlyURLSearchParams } from "next/navigation";
import bigIntToWords from "@/app/lib/tools/numberToWords";

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
    <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      <div className="col-span-1 grid gap-2 rounded bg-darky p-3 text-center sm:col-span-2 lg:col-span-3">
        <p className="text-xs lowercase italic text-mid">up to 64 digits!</p>  
        <p className="break-all text-2xl text-primary sm:text-4xl md:text-5xl lg:text-8xl">
          {number.toLocaleString()}
        </p>
        <p className="italic">{bigIntToWords(number)}</p>
      </div>
    </section>
  );
}
