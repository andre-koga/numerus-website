"use client";

import { mathQuotes } from "@/app/lib/data";
import { useEffect, useState } from "react";

export default function Header() {
  const [quoteID, setQuoteID] = useState<number>(0);

  useEffect(() => {
    setQuoteID(Math.floor(Math.random() * (mathQuotes.length - 1)) + 1);
  }, []);

  return (
    <header className="m-3 sm:m-4">
      <p className="my-3 text-center text-xs italic text-mid">
        have any other cool quotes that you want to see here?{" "}
        <a
          target="_blank"
          href="https://5hlun88awqk.typeform.com/to/rDnsEFyh"
          className="underline underline-offset-2"
        >
          send me a message!
        </a>
      </p>
      <div className="mb-4 rounded bg-darky p-3 text-center">
        <p className="my-1 text-sm italic text-lighty md:text-base">
          &quot;{mathQuotes[quoteID].quote}&quot;
        </p>
        <p className="my-1 text-xs italic text-lighty md:text-sm">
          {mathQuotes[quoteID].author}
        </p>
      </div>
      <hr className="border-mid" />
    </header>
  );
}
