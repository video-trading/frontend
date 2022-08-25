import { CodeBlock, Parser } from "./parser";

export type SolidityType = "int" | "string" | "address" | "bool";

export class SolidityParser extends Parser<SolidityType> {
  protected defaultCodeBlock(
    input: string,
    index: number
  ): CodeBlock<SolidityType> {
    return {
      id: index,
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

  private valueToString(value: string, type: SolidityType): string {
    switch (type) {
      case "string":
      case "address":
        return `"${value}"`;
      default:
        return value;
    }
  }

  protected generateLine(input: CodeBlock<SolidityType>): string {
    const oldCodeBlock = this.cleanCodeBlock(
      this.parseLine(input.code, input.id)
    );

    if (oldCodeBlock.name !== undefined) {
      let lines = oldCodeBlock.code.split("\n");
      let code = lines.slice(0, lines.length - 1);
      code.push(
        `${input.type} ${input.name} = ${this.valueToString(
          input.value!,
          input.type
        )};`
      );
      return code.join("\n");
    }

    return input.code;
  }

  protected parseLine(line: string, index: number): CodeBlock<SolidityType> {
    const code = line.split("\n")[1];
    if (code === undefined) {
      return this.defaultCodeBlock(line, index);
    }

    // gets type, name and value from solidity code
    // for example, address x = 1 will be split to ["address", "x", "1"]
    const [lhs, rhs] = code.trim().split("=");
    const [type, name] = lhs.split(" ");
    const value = rhs.replace(";", "").trim();
    return {
      id: index,
      type: type as SolidityType,
      value: value,
      name: name,
      code: line,
      error: false,
    };
  }
}
