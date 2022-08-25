import React from "react";
import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import { useCodeVisulization } from "../useCodeVis";

export function Editor(props: EditorProps) {
  const { code, setCode } = useCodeVisulization();

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="sol"
      value={code}
      onChange={(newCode) => {
        setCode(newCode as string);
      }}
      theme="vs-dark"
      options={{
        minimap: {
          enabled: false,
        },
      }}
    />
  );
}
