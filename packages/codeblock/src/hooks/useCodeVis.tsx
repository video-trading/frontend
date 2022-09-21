import { getParserByLanguage } from "@etherdata-blockchain/codeblock";
import React, { useMemo } from "react";
import { useContext } from "react";
import CodeVisulizationContext from "../context";
import { NetworkParser } from "../networkParser";

export function useCodeVisulization() {
  const {
    code,
    setCode,
    isLoading,
    setIsLoading,
    language,
    setLanguage,
    shouldParseEditorCode,
    setShouldParseEditorCode,
  } = useContext(CodeVisulizationContext);

  return {
    code,
    setCode,
    isLoading,
    setIsLoading,
    language,
    setLanguage,
    shouldParseEditorCode,
    setShouldParseEditorCode,
  };
}
