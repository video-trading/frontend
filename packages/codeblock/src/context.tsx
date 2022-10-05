import debounce from "lodash.debounce";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NetworkParser } from "./networkParser";

interface ContextInterface {
  url: string;
  setUrl: (url: string) => void;
  code: string;
  setCode: (code: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  language: string;
  setLanguage: (language: string) => void;
  blocks: any[];
  setBlocks: (blocks: any[]) => void;
  parse: (code: string) => void;
  generate: (blocks: any[], code: string) => void;
  shouldParseEditorCode: boolean;
  error?: any;
}

//@ts-ignore
const CodeVisulizationContext = createContext<ContextInterface>({});

export function CodeVisulizationProvider(props: any) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("sol");
  const [shouldParseEditorCode, setShouldParseEditorCode] = useState(true);
  const [url, setUrl] = useState("");
  const [blocks, setBlocks] = useState<any[]>([]);
  const [error, setError] = useState<any>(undefined);

  const parser = useMemo(() => {
    return new NetworkParser(url, language);
  }, [url, language]);

  const generate = useCallback(
    async (blocks: any[], code: string) => {
      setError(undefined);
      try {
        let codeResult = await parser.generate(blocks, code);
        setCode(codeResult);
      } catch (err) {
        setError(err);
        console.error(err);
      }
      setIsLoading(false);
    },
    [parser]
  );

  /**
   * Generating code using codeblocks
   */
  const debounceGenerating = useMemo(() => {
    return debounce(generate, 1000);
  }, [parser]);

  const parse = useCallback(
    async (code: string) => {
      if (parser.url === "") {
        return;
      }

      setError(undefined);
      setShouldParseEditorCode(false);
      try {
        const blocks = await parser.parse(code);
        setBlocks(blocks);
      } catch (err) {
        setError(err);
        console.error(err);
      }
      setIsLoading(false);
      setShouldParseEditorCode(true);
    },
    [parser]
  );

  /**
   * Parsing code into codeblocks
   */
  const debounceParsing = useMemo(() => {
    return debounce(parse, 1000);
  }, [parser]);

  useEffect(() => {
    if (parser.url !== "") {
      parse(code);
    }
  }, [parser]);

  const value: ContextInterface = {
    code,
    setCode,
    isLoading,
    setIsLoading,
    language,
    setLanguage,
    url,
    setUrl,
    blocks,
    setBlocks,
    parse: debounceParsing,
    generate: debounceGenerating,
    shouldParseEditorCode,
    error,
  };

  return (
    <CodeVisulizationContext.Provider value={value}>
      {props.children}
    </CodeVisulizationContext.Provider>
  );
}

export default CodeVisulizationContext;
