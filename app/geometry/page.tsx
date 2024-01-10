import Field from "@/app/ui/fields/Field";
import { ModuleOption } from "@/app/lib/types";

const options: ModuleOption[] = [];

export default function Page() {
  return <Field title="geometry" options={options}></Field>;
}
