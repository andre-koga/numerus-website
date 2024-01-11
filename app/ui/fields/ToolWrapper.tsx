"use client";

import moment from "moment";
import ToolForm from "./ToolForm";
import { ToolFormData, ToolNode } from "@/app/lib/types";
import { useState } from "react";

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
  const [values, setValues] = useState<number[]>(
    Array(formData.inputTypes.length).fill(0),
  );

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
