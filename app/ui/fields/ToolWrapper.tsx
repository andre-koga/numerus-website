"use client";

import moment from "moment";
import ToolForm from "./ToolForm";
import { ToolFormData, ToolNode } from "@/app/lib/types";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { LiaInfoCircleSolid } from "react-icons/lia";
import clsx from "clsx";

export default function ToolWrapper({
  title,
  info,
  updatedAt,
  formData,
  toolNode,
}: {
  title: string;
  info?: string;
  updatedAt?: string;
  formData: ToolFormData;
  toolNode: ToolNode;
}) {
  const searchParams = useSearchParams();
  let startValues =
    searchParams
      .get(formData.shortName)
      ?.split(",")
      .map((text) => BigInt(text)) || [];

  if (startValues.length !== formData.inputTypes.length)
    startValues = Array(formData.inputTypes.length).fill(0);

  const [values, setValues] = useState<BigInt[]>(startValues);
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = (event: React.MouseEvent) => {
    setShowInfo(!showInfo);
  };

  return (
    <section className="rounded border border-mid bg-darky p-2 pt-1 sm:p-3 sm:pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg uppercase">{title}</h2>
        {info && (
          <button
            onClick={toggleInfo}
            className="cursor-pointer text-xl transition-colors hover:text-primary"
          >
            <LiaInfoCircleSolid />
          </button>
        )}
      </div>
      {updatedAt && (
        <p className="text-xs lowercase italic text-lighty">
          last updated {moment(updatedAt, "YYYYMMDD").fromNow()}
        </p>
      )}
      <div
        className={clsx(
          "flex items-center overflow-hidden transition-all",
          { "h-0": !showInfo },
          { "mt-2 h-10": showInfo },
        )}
      >
        <p>{info}</p>
      </div>
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
