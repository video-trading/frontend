import { CodeBlock } from "@etherdata-blockchain/codeblock";
import axios from "axios";

export class NetworkParser {
  url: string;
  language: string;

  constructor(url: string, language: string) {
    this.url = url;
    this.language = language;
  }

  async parse(input: string): Promise<CodeBlock<any>[]> {
    const result = await axios.post(this.url, {
      code: input,
      language: this.language,
      mode: "parsing",
    });

    return result.data.blocks;
  }

  async generate(blocks: CodeBlock<any>[]): Promise<string> {
    const result = await axios.post(this.url, {
      blocks: blocks,
      language: this.language,
      mode: "generation",
    });

    return result.data.code;
  }
}
