export type Quote = {
  quote: string;
  author: string;
};

export type ToolOptionDictionary = { [key: string]: ToolOption };

export type ToolOption = {
  title: string;
  tool: React.ReactNode;
};

export type ToolNode = () => React.ReactNode;
