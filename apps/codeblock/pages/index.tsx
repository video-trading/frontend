import {
  AppBar,
  Box,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Stack,
  Toolbar,
} from "@mui/material";
import { ConfigPanel, Editor } from "codevis";
import { useCodeVisulization } from "codevis/src/hooks/useCodeVis";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const sampleCode: { [key: string]: string } = {
  solidity: `// SPDX-License-Identifier: MIT
  // compiler version must be greater than or equal to 0.8.13 and less than 0.9.0
  pragma solidity ^0.8.13;
  
  contract HelloWorld {
      //@codeblock
      string greet = "Hello World!";
  
      //@codeblock
      // Price of the item
      int price = 0;
  }
  `,
  typescript: `
    //@codeblock
    const greet = "Hello World!";
  `,
};

const url = process.env.NEXT_PUBLIC_URL!;
const Home: NextPage = () => {
  const [language, setLanguage] = useState<string>("solidity");
  const { isLoading } = useCodeVisulization();

  return (
    <div>
      <Head>
        <title>CodeBlock Demo</title>
      </Head>
      <AppBar>
        <Toolbar>
          <Stack justifyContent={"space-between"} width="100vw" direction="row">
            <Box flex={1}>
              <Collapse in={isLoading} mountOnEnter unmountOnExit>
                <CircularProgress size={30} />
              </Collapse>
            </Box>
            <Box flex={10} />
            <Box flex={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Language</InputLabel>
                <Select
                  native
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {Object.keys(sampleCode).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box pt={12} component="main">
        <Body language={language} />
      </Box>
    </div>
  );
};

interface BodyProps {
  language: string;
}

function Body(props: BodyProps) {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Stack p={5}>
          <Divider>Code Blocks</Divider>
          <ConfigPanel
            language={props.language}
            code={sampleCode[props.language]}
            url={url}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Editor
          height={"calc(100vh - 100px)"}
          theme="vs-dark"
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Home;
