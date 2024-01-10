export type Quote = {
  quote: string;
  author: string;
};

export type ModuleOptionDictionary = { [key: string]: ModuleOption };

export type ModuleOption = {
  title: string;
  module: React.ReactNode;
};

export type ModuleNode = () => React.ReactNode;
