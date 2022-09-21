import {
  CodeBlock,
  getParserByLanguage,
  SolidityType,
} from "@etherdata-blockchain/codeblock";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCodeVisulization } from "../hooks/useCodeVis";
import useDebounce from "../hooks/useDebounce";
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

type Props = NetworkProps | ConfigPanelProps;

export function ConfigPanel(props: Props) {
  const {
    setCode,
    code: editorCode,
    setIsLoading,
    shouldParseEditorCode,
    setShouldParseEditorCode,
  } = useCodeVisulization();
  const { code, language } = props;
  const [blocks, setBlocks] = useState<CodeBlock<SolidityType>[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isConfigChanged, setIsConfigChanged] = useState(false);

  const search = useDebounce(
    (props as NetworkProps).url !== undefined ? 1000 : 0
  );

  const parser = useMemo(() => {
    const { url } = props as NetworkProps;
    if (url) {
      return new NetworkParser(url, language);
    }
    return getParserByLanguage(language);
  }, [(props as NetworkProps).url]);

  useEffect(() => {
    (async () => {
      // console.log("On code changing");
      try {
        setIsLoading(true);
        const blocks = await parser.parse(code);
        setBlocks(blocks);
        setCode(code);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
        setHasInitialized(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!shouldParseEditorCode || !hasInitialized || isConfigChanged) {
        return;
      }
      // console.log("On Editor changing");
      try {
        setIsLoading(true);
        await search(async () => {
          console.log("searching editor code");
          const blocks = await parser.parse(editorCode);
          setBlocks(blocks);
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
        setShouldParseEditorCode(false);
      }
    })();
  }, [
    shouldParseEditorCode,
    parser,
    editorCode,
    hasInitialized,
    isConfigChanged,
  ]);

  const onChange = useCallback(
    async (value: string, index: number) => {
      // console.log("On Config Changing");
      try {
        setIsConfigChanged(true);
        setIsLoading(true);
        const newBlocks = [...blocks];
        newBlocks[index].value = value;
        setBlocks(newBlocks);
        // use debounce if it is network parser
        if ((props as NetworkProps).url) {
          await search(async () => {
            const newCode = await parser.generate(newBlocks);
            setCode(newCode);
          });
        } else {
          const newCode = await parser.generate(newBlocks);
          setCode(newCode);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        setIsConfigChanged(false);
      }
    },
    [blocks, parser]
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
    [blocks, parser]
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
