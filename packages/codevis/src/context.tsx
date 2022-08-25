import { createContext, useState } from "react";

interface ContextInterface {
  code: string;
  setCode: (code: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  language: string;
  setLanguage: (language: string) => void;
}

//@ts-ignore
const CodeVisulizationContext = createContext<ContextInterface>({});

export function CodeVisulizationProvider(props: any) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("sol");

  const value: ContextInterface = {
    code,
    setCode,
    isLoading,
    setIsLoading,
    language,
    setLanguage,
  };

  return (
    <CodeVisulizationContext.Provider value={value}>
      {props.children}
    </CodeVisulizationContext.Provider>
  );
}

export default CodeVisulizationContext;
