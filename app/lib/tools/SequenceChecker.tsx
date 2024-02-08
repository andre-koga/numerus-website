import { HomeToolNode } from "../types";

const SequenceChecker: HomeToolNode = (value) => {
  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  return <></>;
};

export default SequenceChecker;
