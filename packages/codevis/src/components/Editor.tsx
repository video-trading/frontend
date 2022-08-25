import React from "react";
import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import { useCodeVisulization } from "../useCodeVis";

export function Editor(props: EditorProps) {
  const { code, setCode, language } = useCodeVisulization();

  return (
    <MonacoEditor
      {...props}
      defaultLanguage={language}
      value={code}
      onChange={(newCode) => {
        setCode(newCode as string);
      }}
    />
  );
}
