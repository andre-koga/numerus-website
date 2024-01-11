"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import {
  TbCube,
  TbMathFunction,
  TbBinaryTree2,
  TbNumber,
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
      <ul className="m-2 grid grid-cols-4 gap-2 sm:grid-cols-1 sm:gap-3">
        <li className="-mx-0.5 my-1 hidden rounded-full sm:block">
          <Link href="/">
            <div className="rounded bg-primary py-1 font-bold uppercase italic text-dark transition-colors hover:bg-yellow-200 active:bg-light">
              <p className="whitespace-nowrap text-center text-lg md:text-lg">
                numerus
              </p>
            </div>
          </Link>
        </li>
        <hr className="hidden border-mid sm:block" />
        {buttons.map((button, i) => (
          <li className="rounded-full" key={i}>
            <Link href={button.link}>
              <div
                className={clsx(
                  "rounded-full py-2 transition-colors",
                  {
                    "bg-light text-dark": pathname.split("/")[1] == button.link,
                  },
                  {
                    "bg-mid hover:bg-lighty hover:text-dark":
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
