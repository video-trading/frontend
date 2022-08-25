import {
  CodeBlock,
  getParserByLanguage,
  SolidityType,
} from "@etherdata-blockchain/codeblock";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useCodeVisulization } from "../useCodeVis";
import BooleanField from "./fields/BooleanField";
import NumberField from "./fields/NumberField";
import StringField from "./fields/StringField";
import { FieldProps } from "./types";

interface ConfigPanelProps {
  code: string;
}

export function ConfigPanel({ code }: ConfigPanelProps) {
  const { setCode, code: editorCode } = useCodeVisulization();

  const [blocks, setBlocks] = useState<CodeBlock<SolidityType>[]>([]);

  useEffect(() => {
    const parser = getParserByLanguage("sol");
    const blocks = parser.parse(code);
    setBlocks(blocks);
    setCode(code);
  }, [code]);

  useEffect(() => {
    const parser = getParserByLanguage("sol");
    const blocks = parser.parse(editorCode);
    setBlocks(blocks);
    console.log("Updating editor code");
  }, [editorCode]);

  const onChange = useCallback(
    (value: string, index: number) => {
      const parser = getParserByLanguage("sol");
      const newBlocks = [...blocks];
      newBlocks[index].value = value;
      const newCode = parser.generate(newBlocks);

      setBlocks(newBlocks);
      setCode(newCode);
    },
    [blocks]
  );

  const renderer = useCallback(
    (block: CodeBlock<SolidityType>): JSX.Element => {
      const props: FieldProps = {
        index: block.id,
        value: block.value,
        description: block.description,
        onChange,
      };

      switch (block.type) {
        case "string":
          return <StringField {...props} />;
        case "int":
          return <NumberField {...props} />;
        case "bool":
          return <BooleanField {...props} />;
      }

      return <></>;
    },
    [blocks]
  );

  return (
    <Stack spacing={2}>
      {blocks
        .filter((b) => b.value !== undefined && b.name !== undefined)
        .map((block, index) => (
          <Card key={`config-card-${index}`}>
            <CardContent>
              <Stack>
                <Stack direction={"row"} spacing={2}>
                  <Typography variant="h6" fontWeight={600}>
                    {block.name}
                  </Typography>
                  <Chip label={block.type} variant="outlined" />
                </Stack>
                <Box mt={2}>{renderer(block)}</Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
    </Stack>
  );
}
