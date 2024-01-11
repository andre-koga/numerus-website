import { ReadonlyURLSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export type Quote = {
  quote: string;
  author: string;
};

export type ToolOptionDictionary = { [key: string]: ToolOption };

export type ToolOption = {
  title: string;
  info: string;
  tool: ToolNode;
  shortName: string;
  inputTypes: Array<FormNumberInput | FormDropdownInput>;
};

export type ToolNode = (values: BigInt[]) => React.ReactNode;

export type FormNumberInput = {
  type: "number";
  tooltip?: string;
};

export type FormDropdownInput = {
  type: "dropdown";
  options: string[];
};

export type ToolFormData = {
  shortName: string;
  inputTypes: Array<FormNumberInput | FormDropdownInput>;
};

export type ValueStates = {
  [key: string]: [number[], Dispatch<SetStateAction<number[]>>];
};
