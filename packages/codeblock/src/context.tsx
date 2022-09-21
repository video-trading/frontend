import { CodeBlock, SolidityType } from "@etherdata-blockchain/codeblock";
import { createContext, useState } from "react";

interface ContextInterface {
  code: string;
  setCode: (code: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  language: string;
  setLanguage: (language: string) => void;
  shouldParseEditorCode: boolean;
  setShouldParseEditorCode: (shouldParseEditorCode: boolean) => void;
}

//@ts-ignore
const CodeVisulizationContext = createContext<ContextInterface>({});

export function CodeVisulizationProvider(props: any) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("sol");
  const [shouldParseEditorCode, setShouldParseEditorCode] = useState(true);

  const value: ContextInterface = {
    code,
    setCode,
    isLoading,
    setIsLoading,
    language,
    setLanguage,
    shouldParseEditorCode,
    setShouldParseEditorCode,
  };

  return (
    <CodeVisulizationContext.Provider value={value}>
      {props.children}
    </CodeVisulizationContext.Provider>
  );
}

export default CodeVisulizationContext;
