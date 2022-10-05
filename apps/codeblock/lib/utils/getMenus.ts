import glob from "glob";
import path from "path";
import { CodePickerInterface } from "../types/CodePicker";

export function getMenus(folder: string): CodePickerInterface[] {
  const languages = glob.sync(folder);
  const menus: CodePickerInterface[] = languages.map((language) => {
    const files = glob.sync(path.join(language, "*"));
    const name = path.basename(language);
    return {
      language: name,
      files: files.map((file) => path.basename(file)),
    };
  });
  return menus;
}
