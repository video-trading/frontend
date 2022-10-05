import React, { useMemo } from "react";
import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import { useCodeVisulization } from "../hooks/useCodeVis";

export function Editor(props: EditorProps) {
  const {
    code,
    language,
    parse,
    shouldParseEditorCode,
    setCode,
    setIsLoading,
  } = useCodeVisulization();

  const editorLanguage = useMemo(() => {
    switch (language) {
      case "solidity":
        return "sol";
    }
    return language;
  }, [language]);

  return (
    <MonacoEditor
      {...props}
      language={editorLanguage}
      value={code}
      onChange={(newCode) => {
        if (!shouldParseEditorCode) return;
        setIsLoading(true);
        setCode(newCode ?? "");
        parse(newCode ?? "");
      }}
    />
  );
}
