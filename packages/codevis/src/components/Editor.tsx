import React from "react";
import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import { useCodeVisulization } from "../hooks/useCodeVis";

export function Editor(props: EditorProps) {
  const { code, setCode, language, setShouldParseEditorCode } =
    useCodeVisulization();

  return (
    <MonacoEditor
      {...props}
      defaultLanguage={language}
      value={code}
      onChange={(newCode) => {
        setShouldParseEditorCode(true);
        setCode(newCode as string);
      }}
    />
  );
}
