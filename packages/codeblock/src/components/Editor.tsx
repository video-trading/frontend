import React, { useCallback, useEffect, useMemo } from "react";
import MonacoEditor, {
  EditorProps,
  Monaco,
  useMonaco,
} from "@monaco-editor/react";
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
  const monaco = useMonaco();

  const setupAutocompletion = useCallback(
    (monaco: Monaco, language: string) => {
      monaco.languages.registerCompletionItemProvider(language, {
        provideCompletionItems: (model, position, context, token) => {
          let word = model.getWordUntilPosition(position);

          return {
            suggestions: [
              {
                label: "codeblock",
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: "//@codeblock",
                range: {
                  startLineNumber: position.lineNumber,
                  endLineNumber: position.lineNumber,
                  startColumn: word.startColumn,
                  endColumn: word.endColumn,
                },
              },
            ],
          };
        },
      });
    },
    []
  );

  const editorLanguage = useMemo(() => {
    switch (language) {
      case "solidity":
        return "sol";
    }
    return language;
  }, [language]);

  useEffect(() => {
    if (monaco) {
      setupAutocompletion(monaco, editorLanguage);
    }
  }, [editorLanguage, monaco]);

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
