export interface CodeBlock<T> {
  /**
   * Code block type.
   */
  type: T;
  /**
   * Value holds by the variable.
   */
  value?: string;
  /**
   * Variable name.
   */
  name?: string;
  /**
   * Original code.
   */
  code: string;
  /**
   *
   */
  error: boolean;
}

export abstract class Parser<T> {
  codeBlockMatcher = /\/\/@codeblock/;

  /**
   * Parse code to a list of code blocks.
   * @param input The input code to parse.
   */
  parse(input: string): CodeBlock<T>[] {
    const lines = input.split("\n");
    const codeBlocks: CodeBlock<T>[] = [];
    // loop through each line
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      // if line is a code block
      if (this.codeBlockMatcher.test(line)) {
        // get the next line which is the code block
        // also check if current line is the last line
        if (i + 1 < lines.length) {
          const code = line + "\n" + lines[i + 1];
          // add the code block to the code blocks array
          codeBlocks.push(this.cleanCodeBlock(this.parseLine(code)));
          i += 2;
        } else {
          // if current line is the last line, add the default code block
          codeBlocks.push(this.defaultCodeBlock(line));
          i += 1;
        }
      } else {
        // if line is not a code block, add the default code block
        codeBlocks.push(this.defaultCodeBlock(line));
        i++;
      }
    }

    return codeBlocks;
  }

  /**
   * Given a list of code blocks, returns a code string
   */
  generate(input: CodeBlock<T>[]): string {
    let output = "";

    for (let i = 0; i < input.length; i++) {
      output += this.generateLine(input[i]);
      if (i < input.length - 1) {
        output += "\n";
      }
    }
    return output;
  }

  protected abstract defaultCodeBlock(input: string): CodeBlock<T>;

  /**
   * Parse a line of code to a code block.
   */
  protected abstract parseLine(line: string): CodeBlock<T>;

  protected abstract generateLine(input: CodeBlock<T>): string;

  /**
   * Clean a code block.
   * @param input Code Block
   * @returns Cleaned Code Block
   */
  protected abstract cleanCodeBlock(input: CodeBlock<T>): CodeBlock<T>;
}
