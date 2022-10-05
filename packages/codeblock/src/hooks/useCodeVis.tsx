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
    parse,
    generate,
    setUrl,
    blocks,
    setBlocks,
    shouldParseEditorCode,
    error,
  } = useContext(CodeVisulizationContext);

  return {
    code,
    setCode,
    isLoading,
    setIsLoading,
    language,
    setLanguage,
    parse,
    generate,
    setUrl,
    blocks,
    setBlocks,
    shouldParseEditorCode,
    error,
  };
}
