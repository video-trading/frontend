import { CodeBlock, Parser } from "./parser";

type TestBlockType = "string";

class TestParser extends Parser<TestBlockType> {
  protected defaultCodeBlock(input: string): CodeBlock<"string"> {
    return {
      type: "string",
      code: input,
      error: false,
    };
  }
  protected cleanCodeBlock(input: CodeBlock<"string">): CodeBlock<"string"> {
    return input;
  }
  protected generateLine(input: CodeBlock<TestBlockType>): string {
    return input.code;
  }

  protected parseLine(line: string): CodeBlock<TestBlockType> {
    // if line is empty, return
    if (line.trim() === "") {
      return {
        type: "string",
        value: "",
        name: "",
        code: line,
        error: true,
      };
    }

    return {
      type: "string",
      value: "hello world",
      name: "hello",
      code: line,
      error: false,
    };
  }
}

describe("Given a parser", () => {
  test("Should parse code correctly", () => {
    const parser = new TestParser();
    const input = `
    //@codeblock
    const hello = "hello world" 
    `;
    const output = parser.parse(input);
    expect(output).toHaveLength(3);
    expect(output[1].code.length).toBeGreaterThan(0);
    expect(output[1].value).toBe("hello world");
    expect(output[1].name).toBe("hello");
    expect(output[1].type).toBe("string");
  });

  test("Should parse code correctly", () => {
    const parser = new TestParser();
    const input = `
    //@codeblock`;
    const output = parser.parse(input);
    expect(output).toHaveLength(2);
  });

  test("Should parse code correctly", () => {
    const parser = new TestParser();
    const input = `
    //@codeblock
    `;
    const output = parser.parse(input);
    expect(output).toHaveLength(2);
  });

  test("Should parse code correctly", () => {
    const parser = new TestParser();
    const input = `
    let b = 3;

    //@codeblock
    let a = 1;
    `;
    const output = parser.parse(input);
    expect(output).toHaveLength(5);
    expect(output[3].code.split("\n").length).toBe(2);
  });

  test("Should parse code correctly", () => {
    const parser = new TestParser();
    const input = `
    //@codeblock
    let a = 1;
    let b =1
    `;
    const output = parser.parse(input);
    expect(output).toHaveLength(4);
    expect(output[1].code.split("\n").length).toBe(2);
  });

  test("Should generate code correctly", () => {
    const parser = new TestParser();
    const input = `
    //@codeblock
const hello = "hello world" 
    `;
    const output = parser.generate(parser.parse(input));
    expect(output).toBe(input);
  });
});
