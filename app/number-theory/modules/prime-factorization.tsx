"use client";

import { ModuleNode } from "@/app/lib/types";
import Module from "@/app/ui/fields/Module";
import { useSearchParams } from "next/navigation";

const PrimeFactorization: ModuleNode = () => {
  const searchParams = useSearchParams();

  return <Module></Module>;
};

export default PrimeFactorization;
