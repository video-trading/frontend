import axios from "axios";

export class NetworkParser {
  url: string;
  language: string;

  constructor(url: string, language: string) {
    this.url = url;
    this.language = language;
  }

  async parse(input: string): Promise<any[]> {
    const result = await axios.post(this.url, {
      code: input,
      language: this.language,
      mode: "parse",
    });

    return result.data.blocks;
  }

  async generate(blocks: any[], code: string): Promise<string> {
    const result = await axios.post(this.url, {
      code: code,
      blocks: blocks,
      language: this.language,
      mode: "generate",
    });

    console.log("result", result.data);
    return result.data.code;
  }
}
