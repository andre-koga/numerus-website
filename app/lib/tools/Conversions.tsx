import { HomeToolNode } from "../types";

const Conversions: HomeToolNode = (value) => {
  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  const convert = (val: bigint, base: number) => {
    return val.toString(base) + "_{" + base + "}";
  };

  return (
    <>
      <p>{`$$${convert(value, 2)}$$
      $$${convert(value, 3)}$$
      $$${convert(value, 6)}$$
      $$${convert(value, 8)}$$
      $$${convert(value, 16)}$$`}</p>
    </>
  );
};

export default Conversions;
