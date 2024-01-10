import Field from "@/app/ui/fields/Field";
import { ToolOptionDictionary } from "@/app/lib/types";

const options: ToolOptionDictionary = {};

export default function Page() {
  return <Field title="geometry" options={options}></Field>;
}
