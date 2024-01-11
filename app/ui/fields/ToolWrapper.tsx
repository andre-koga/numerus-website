"use client";

import moment from "moment";
import ToolForm from "./ToolForm";
import { ToolFormData, ToolNode } from "@/app/lib/types";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ToolWrapper({
  title,
  updatedAt,
  formData,
  toolNode,
}: {
  title: string;
  updatedAt?: string;
  formData: ToolFormData;
  toolNode: ToolNode;
}) {
  const searchParams = useSearchParams();
  let startValues =
    searchParams
      .get(formData.shortName)
      ?.split(",")
      .map((text) => Number(text)) || [];

  if (startValues.length !== formData.inputTypes.length)
    startValues = Array(formData.inputTypes.length).fill(0);

  const [values, setValues] = useState<number[]>(startValues);

  return (
    <section className="rounded border border-mid bg-darky p-3">
      <h2 className="text-lg uppercase">{title}</h2>
      {updatedAt && (
        <p className="text-xs lowercase italic text-lighty">
          last updated {moment(updatedAt, "YYYYMMDD").fromNow()}
        </p>
      )}
      <div className="mt-4">{toolNode(values)}</div>
      <ToolForm
        shortName={formData.shortName}
        inputTypes={formData.inputTypes}
        inputs={values}
        setInputs={setValues}
      />
    </section>
  );
}
