import { CodeBlock, Parser } from "./parser";

export type SolidityType = "int" | "string" | "address" | "bool";

export class SolidityParser extends Parser<SolidityType> {
  protected defaultCodeBlock(input: string): CodeBlock<SolidityType> {
    return {
      type: "string",
      code: input,
      error: false,
    };
  }
  protected cleanCodeBlock(
    input: CodeBlock<SolidityType>
  ): CodeBlock<SolidityType> {
    let { value, type } = input;
    if (value === undefined) {
      return input;
    }

    switch (type) {
      case "string":
      case "address":
        value = value.replaceAll('"', "");
      default:
        break;
    }

    return {
      ...input,
      value,
    };
  }
  protected generateLine(input: CodeBlock<SolidityType>): string {
    const oldCodeBlock = this.cleanCodeBlock(this.parseLine(input.code));
    let code = input.code.replace(oldCodeBlock.value ?? "", input.value ?? "");
    return code;
  }

  protected parseLine(line: string): CodeBlock<SolidityType> {
    const code = line.split("\n")[1];
    if (code === undefined) {
      return this.defaultCodeBlock(line);
    }

    // gets type, name and value from solidity code
    // for example, address x = 1 will be split to ["address", "x", "1"]
    const [lhs, rhs] = code.trim().split("=");
    const [type, name] = lhs.split(" ");
    const value = rhs.replace(";", "").trim();
    return {
      type: type as SolidityType,
      value: value,
      name: name,
      code: line,
      error: false,
    };
  }
}
