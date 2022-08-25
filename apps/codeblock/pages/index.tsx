import type { NextPage } from "next";
import Head from "next/head";
import { ConfigPanel, Editor } from "codevis";
import {
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Switch,
} from "@mui/material";
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

  return (
    <Grid container spacing={5}>
      <Head>
        <title>CodeBlock Demo</title>
      </Head>

      <Grid item xs={12} md={6}>
        <Stack p={5}>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              label={checked ? "Use Network" : "Use Local"}
              checked={checked}
              onChange={(e, checked) => setChecked(checked)}
            />
          </FormGroup>
          <Divider>Code Blocks</Divider>
          <ConfigPanel
            code={sampleCode}
            language="sol"
            url={checked ? url : undefined}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Editor
          height={"100vh"}
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
};

export default Home;
