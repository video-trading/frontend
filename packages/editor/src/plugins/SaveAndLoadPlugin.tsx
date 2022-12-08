// @flow
import * as React from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export function SaveAndLoadPlugin(props: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (props.value) {
      const state = editor.parseEditorState(props.value);
      editor.setEditorState(state);
    }
  }, [editor]);

  return (
    <OnChangePlugin
      onChange={(editorState, editor) => {
        props.onChange(JSON.stringify(editorState));
      }}
    />
  );
}
