import {
  CodeBlock,
  getParserByLanguage,
  SolidityType,
} from "@etherdata-blockchain/codeblock";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Collapse,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NetworkParser } from "../networkParser";
import { useCodeVisulization } from "../useCodeVis";
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
    isLoading,
    setIsLoading,
  } = useCodeVisulization();
  const { code, language } = props;
  const parser = useMemo(() => {
    const { url } = props as NetworkProps;
    if (url) {
      return new NetworkParser(url, language);
    }
    return getParserByLanguage(language);
  }, [props]);

  const [blocks, setBlocks] = useState<CodeBlock<SolidityType>[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const blocks = await parser.parse(code);
        setBlocks(blocks);
        setCode(code);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [code, parser]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const blocks = await parser.parse(editorCode);
        setBlocks(blocks);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [editorCode, parser]);

  const onChange = useCallback(
    async (value: string, index: number) => {
      try {
        setIsLoading(true);
        const newBlocks = [...blocks];
        newBlocks[index].value = value;
        const newCode = await parser.generate(newBlocks);

        setBlocks(newBlocks);
        setCode(newCode);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
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
      <Collapse mountOnEnter unmountOnExit in={isLoading} timeout={500}>
        <Box>
          <LinearProgress />
        </Box>
      </Collapse>
    </Stack>
  );
}
