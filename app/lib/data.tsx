import { ToolOptionDictionary, Quote } from "@/app/lib/types";
import PrimeFactorization from "@/app/number-theory/tools/PrimeFactorization";

export const mathQuotes: Quote[] = [
  {
    quote: "loading",
    author: "",
  },
  {
    quote: "Mathematics is the music of reason.",
    author: "James Joseph Sylvester",
  },
  {
    quote:
      "Do not worry about your difficulties in mathematics; I can assure you that mine are still greater.",
    author: "Albert Einstein",
  },
  {
    quote:
      "Mathematics is the most beautiful and most powerful creation of the human spirit.",
    author: "Stefan Banach",
  },
  {
    quote:
      "In mathematics, the art of proposing a question must be held of higher value than solving it.",
    author: "Georg Cantor",
  },
  {
    quote: "The only way to learn mathematics is to do mathematics.",
    author: "Paul Halmos",
  },
  {
    quote:
      "Mathematics is like checkers in being suitable for the young, not too difficult, amusing, and without peril to the state.",
    author: "Plato",
  },
  {
    quote: "Pure mathematics is, in its way, the poetry of logical ideas.",
    author: "Albert Einstein",
  },
  {
    quote: "The book of nature is written in the language of mathematics.",
    author: "Galileo Galilei",
  },
  {
    quote: "Mathematics is the key and door to the sciences.",
    author: "Galileo Galilei",
  },
  {
    quote:
      "Mathematics is the result of mysterious powers which no one understands, and which the unconscious recognition of beauty must play an important part.",
    author: "Marston Morse",
  },
  {
    quote: "A mathematician is a device for turning coffee into theorems.",
    author: "Alfred Renyi",
  },
  {
    quote: "Mathematics allows for no hypocrisy and no vagueness.",
    author: "Stendhal",
  },
  {
    quote:
      "The only way to do mathematics is to work on it, and the only way to see mathematics is to do it.",
    author: "Paul Halmos",
  },
  {
    quote:
      "The most important question in the world is, 'Why is the square of the hypotenuse equal to the sum of the squares of the other two sides?'",
    author: "Lewis Carroll",
  },
  {
    quote:
      "To those who do not know mathematics, it is difficult to get across a real feeling as to the beauty, the deepest beauty, of nature.",
    author: "Richard Feynman",
  },
];

export const ntheoryOptions: ToolOptionDictionary = {
  "prime-factorization": {
    title: "prime factorization",
    info: "integers only",
    tool: PrimeFactorization,
    shortName: "pf",
    inputTypes: [
      {
        type: "number",
        tooltip: "Number to factorize",
      },
    ],
  },
  // divisors: {
  //   title: "divisors",
  //   tool: <PrimeFactorization />,
  // },
  // primality: {
  //   title: "primality",
  //   tool: <PrimeFactorization />,
  // },
  // "totient-function": {
  //   title: "euler's totient function",
  //   tool: <PrimeFactorization />,
  // },
  // "modular-inverse": {
  //   title: "modular inverses",
  //   tool: <PrimeFactorization />,
  // },
  // crt: {
  //   title: "chinese remainder theorem",
  //   tool: <PrimeFactorization />,
  // },
  // "coprime-check": {
  //   title: "coprime check",
  //   tool: <PrimeFactorization />,
  // },
  // "primitive-roots": {
  //   title: "primitive roots",
  //   tool: <PrimeFactorization />,
  // },
};
