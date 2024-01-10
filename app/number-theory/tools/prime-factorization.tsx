"use client";

import { ToolNode } from "@/app/lib/types";
import Tool from "@/app/ui/fields/Tool";
import { useSearchParams } from "next/navigation";

const PrimeFactorization: ToolNode = () => {
  const searchParams = useSearchParams();

  return <Tool></Tool>;
};

export default PrimeFactorization;
