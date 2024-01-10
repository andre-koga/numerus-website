import Field from "@/app/ui/fields/Field";
import PrimeFactorization from "./modules/prime-factorization";
import { ModuleOptionDictionary } from "@/app/lib/types";

const options: ModuleOptionDictionary = {
  "prime-factorization": {
    title: "prime factorization",
    module: <PrimeFactorization />,
  },
};

export default function Page({
  searchParams,
}: {
  searchParams?: { module?: string };
}) {
  const module = searchParams?.module || "";

  return (
    <Field
      title="number theory"
      options={options}
      currentModule={module}
    ></Field>
  );
}
