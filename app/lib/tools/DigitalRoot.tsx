import { HomeToolNode } from "../types";

const DigitalRoot: HomeToolNode = (value) => {
  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  const digitalRoot = (num: bigint) => {
    return ((num - 1n) % 9n) + 1n;
  };

  return (
    <>
      <p className="mx-2 text-justify text-lg">
        $$dr = {digitalRoot(value).toString()}$$
      </p>
    </>
  );
};

export default DigitalRoot;
