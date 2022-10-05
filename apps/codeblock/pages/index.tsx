import {
  AppBar,
  Box,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  Stack,
  Toolbar,
} from "@mui/material";
import { ConfigPanel, Editor } from "codevis";
import { useCodeVisulization } from "codevis/src/hooks/useCodeVis";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const sampleCode = `// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.13 and less than 0.9.0
pragma solidity ^0.8.13;

contract HelloWorld {
    //@codeblock
    string greet = "Hello World!";

    //@codeblock
    // Price of the item
    int price = 0;
}
`;

const url = process.env.NEXT_PUBLIC_URL!;
const Home: NextPage = () => {
  const [checked, setChecked] = useState(false);
  const { isLoading } = useCodeVisulization();

  return (
    <div>
      <Head>
        <title>CodeBlock Demo</title>
      </Head>
      <AppBar>
        <Toolbar>
          <Stack justifyContent={"space-between"} width="100%" direction="row">
            <Collapse in={isLoading} mountOnEnter unmountOnExit>
              <CircularProgress size={30} />
            </Collapse>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box pt={12} component="main">
        <Body />
      </Box>
    </div>
  );
};

function Body() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Stack p={5}>
          <Divider>Code Blocks</Divider>
          <ConfigPanel language="solidity" code={sampleCode} url={url} />
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
