import Theme from "./themes/Theme";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import React, { useMemo } from "react";
import {
  LexicalComposerContext,
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposerContext";
import { SaveAndLoadPlugin } from "./plugins/SaveAndLoadPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

type Props = {
  initialValue?: string;
  onChange?: (value: string) => void;
};

export function Editor({ initialValue, onChange }: Props) {
  const editorConfig: InitialConfigType = useMemo(() => {
    return {
      // The editor theme
      theme: Theme,
      // Handling of errors during update
      onError(error: any) {
        throw error;
      },
      namespace: "editor",
      // Any custom nodes go here
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
      ],
    };
  }, [initialValue]);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <SaveAndLoadPlugin
            value={initialValue}
            onChange={(value) => {
              if (onChange) {
                onChange(value);
              }
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}

export default Editor;
