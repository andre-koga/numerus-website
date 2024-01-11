import Field from "@/app/ui/fields/Field";
import { ntheoryOptions } from "@/app/lib/data";

export default function Page({
  searchParams,
}: {
  searchParams?: { tool?: string };
}) {
  const tools: string[] = searchParams?.tool?.split(",") || [];
  if (tools.length === 0 || tools[0] === "") {
    return (
      <Field title="number theory" options={ntheoryOptions}>
        <p className="my-4 text-center uppercase text-mid">
          (select one of the functions to continue)
        </p>
      </Field>
    );
  }

  return (
    <Field
      title="number theory"
      options={ntheoryOptions}
      currentTools={tools}
    />
  );
}
