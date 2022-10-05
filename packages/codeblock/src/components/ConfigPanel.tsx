import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCodeVisulization } from "../hooks/useCodeVis";
import { NetworkParser } from "../networkParser";
import BooleanField from "./fields/BooleanField";
import NumberField from "./fields/NumberField";
import StringField from "./fields/StringField";
import { FieldProps } from "./types";

interface ConfigPanelProps {
  code: string;
  language: string;
}

interface NetworkProps extends ConfigPanelProps {
  url: string;
}

type Props = NetworkProps;

export function ConfigPanel(props: Props) {
  const {
    setCode,
    code: editorCode,
    setIsLoading,
    parse,
    generate,
    setUrl,
    setLanguage,
    setBlocks,
    blocks,
  } = useCodeVisulization();
  const { code, language } = props;

  useEffect(() => {
    setCode(code);
    setLanguage(language);
    setUrl(props.url);
  }, []);

  useEffect(() => {
    setUrl(props.url);
    setLanguage(props.language);
  }, [props.url, props.language]);

  const onChange = useCallback(
    async (value: string, index: number) => {
      // on config panel changing
      setIsLoading(true);
      const newBlocks = [...blocks];
      newBlocks[index].value = value;
      // use debounce
      setBlocks(newBlocks);
      generate(blocks, code);
    },
    [blocks, editorCode]
  );

  const renderer = useCallback(
    (block: any): JSX.Element => {
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
      {blocks.map((block, index) => (
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
