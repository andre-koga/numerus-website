"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import {
  TbCube,
  TbMathFunction,
  TbBinaryTree2,
  TbNumber,
  TbHome,
} from "react-icons/tb";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Button = {
  icon: IconType;
  text: string;
  link: string;
};

const buttons: Button[] = [
  { icon: TbMathFunction, text: "algebra", link: "algebra" },
  { icon: TbNumber, text: "n. theory", link: "number-theory" },
  { icon: TbCube, text: "geometry", link: "geometry" },
  { icon: TbBinaryTree2, text: "combo", link: "combinatorics" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="m-2 grid grid-cols-5 gap-2 sm:grid-cols-1 sm:gap-3">
        <li className="mt-1 hidden rounded-full sm:block">
          <Link href="/">
            <div className="rounded uppercase italic text-primary transition-colors hover:bg-primary hover:text-dark active:bg-light">
              <p className="whitespace-nowrap text-center text-lg sm:text-xl">
                numerus
              </p>
            </div>
          </Link>
        </li>
        <hr className="hidden border-mid sm:block" />
        <li className="rounded-full sm:hidden">
          <Link href="/">
            <div
              className={clsx(
                "mx-2 my-0.5 rounded-full border border-primary bg-primary py-2 text-dark transition-colors active:bg-light",
                { "border border-light bg-light text-dark": pathname == "/" },
              )}
            >
              <TbHome className="mx-auto text-xl" />
            </div>
            <p className="whitespace-nowrap text-center text-xs sm:text-sm">
              home
            </p>
          </Link>
        </li>
        {buttons.map((button, i) => (
          <li className="rounded-full" key={i}>
            <Link href={button.link}>
              <div
                className={clsx(
                  "mx-2 my-0.5 rounded-full py-2 transition-colors",
                  {
                    "border border-light bg-light text-dark":
                      pathname.split("/")[1] == button.link,
                  },
                  {
                    "border border-mid hover:bg-mid":
                      pathname.split("/")[1] != button.link,
                  },
                )}
              >
                <button.icon className="mx-auto text-xl" />
              </div>
              <p className="whitespace-nowrap text-center text-xs sm:text-sm">
                {button.text}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
