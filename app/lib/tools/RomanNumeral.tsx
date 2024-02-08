import { HomeToolNode } from "../types";

const RomanNumeral: HomeToolNode = (value) => {
  if (value === undefined) {
    return (
      <>
        <p>something went wrong!</p>
      </>
    );
  }

  const romanize = (val: bigint, size: number = 0): string => {
    if (val <= 3999) {
      const lookup: { [key: string]: bigint } = {
        M: 1000n,
        CM: 900n,
        D: 500n,
        CD: 400n,
        C: 100n,
        XC: 90n,
        L: 50n,
        XL: 40n,
        X: 10n,
        IX: 9n,
        V: 5n,
        IV: 4n,
        I: 1n,
      };
      let roman = "\\text{";
      for (let i in lookup) {
        while (val >= lookup[i]) {
          roman += i;
          val -= BigInt(lookup[i]);
        }
      }
      roman += "}";

      if (size === 0) return roman;
      else {
        return (
          "\\overline{".repeat(size) + roman + "}".repeat(size) + "\\text{ }"
        );
      }
    }

    return `${romanize(val / 1000n, size + 1)}${romanize(val % 1000n, size)}`;
  };

  return (
    <>
      <p className="my-1 text-center text-sm">{`$$${romanize(value)}$$`}</p>
    </>
  );
};

export default RomanNumeral;
