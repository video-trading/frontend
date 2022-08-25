import React, { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
import { useCodeVisulization } from "../useCodeVis";
import { SolidityParser, CodeBlock, SolidityType } from "parser";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import StringField from "./fields/StringField";
import NumberField from "./fields/NumberField";
import { FieldProps } from "./types";
import BooleanField from "./fields/BooleanField";

interface ConfigPanelProps {
  code: string;
}

export function ConfigPanel({ code }: ConfigPanelProps) {
  const { setCode, code: editorCode } = useCodeVisulization();

  const [blocks, setBlocks] = useState<CodeBlock<SolidityType>[]>([]);

  useEffect(() => {
    const parser = new SolidityParser();
    const blocks = parser.parse(code);
    setBlocks(blocks);
    setCode(code);
  }, [code]);

  useEffect(() => {
    const parser = new SolidityParser();
    const blocks = parser.parse(editorCode);
    setBlocks(blocks);
    console.log("Updating editor code");
  }, [editorCode]);

  const onChange = useCallback(
    (value: string, index: number) => {
      const parser = new SolidityParser();
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
