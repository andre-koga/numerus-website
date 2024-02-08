import { Dispatch, SetStateAction } from "react";

export type Quote = {
  quote: string;
  author: string;
};

export type HomeToolNode = (values: bigint) => React.ReactNode;

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
