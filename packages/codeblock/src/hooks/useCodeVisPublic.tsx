import React, { useContext } from "react";
import CodeVisulizationContext from "../context";

export function useCodeVisulization() {
  const { isLoading, setCode, code } = useContext(CodeVisulizationContext);

  return { isLoading };
}
