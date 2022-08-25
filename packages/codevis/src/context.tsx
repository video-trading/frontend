import { createContext, useState } from "react";

interface ContextInterface {
  code: string;
  setCode: (code: string) => void;
}

//@ts-ignore
const CodeVisulizationContext = createContext<ContextInterface>({});

export function CodeVisulizationProvider(props: any) {
  const [code, setCode] = useState("");

  const value: ContextInterface = {
    code,
    setCode,
  };

  return (
    <CodeVisulizationContext.Provider value={value}>
      {props.children}
    </CodeVisulizationContext.Provider>
  );
}

export default CodeVisulizationContext;
