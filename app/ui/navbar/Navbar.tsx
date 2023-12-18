import Link from "next/link";
import { IconType } from "react-icons";
import {
  TbCube,
  TbMathFunction,
  TbBinaryTree2,
  TbNumber,
} from "react-icons/tb";

type Button = {
  icon: IconType;
  text: string;
  link: string;
};

const buttons: Button[] = [
  { icon: TbMathFunction, text: "algebra", link: "/algebra" },
  { icon: TbNumber, text: "n. theory", link: "/number-theory" },
  { icon: TbCube, text: "geometry", link: "/geometry" },
  { icon: TbBinaryTree2, text: "combo", link: "/combinatorics" },
];

export default function Navbar() {
  return (
    <nav>
      <ul className="m-3 grid grid-cols-4 gap-2 sm:grid-cols-1 sm:gap-3">
        {buttons.map((button, i) => (
          <li
            className="rounded-full transition-transform hover:scale-90 active:scale-75"
            key={i}
          >
            <Link href={button.link}>
              <div className="rounded-full bg-mid py-2">
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
