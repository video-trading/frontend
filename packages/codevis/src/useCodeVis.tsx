import React from "react";
import { useContext } from "react";
import CodeVisulizationContext from "./context";

export function useCodeVisulization() {
  const { code, setCode } = useContext(CodeVisulizationContext);

  return { code, setCode };
}
