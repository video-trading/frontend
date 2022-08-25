import React from "react";
import { ConfigPanel, Editor } from "codevis";
import { Box, Stack } from "@mui/material";

const code = `
//@codeblock
string a = "a";
//@codeblock
string b = "b";
//@codeblock
int c = 1;
//@codeblock
bool d = true;
`;

export default function Index() {
  return (
    <Stack direction={"row"} width="100%" spacing={2} p={5}>
      <Box flex={2}>
        <ConfigPanel code={code} />
      </Box>
      <Box flex={2}>
        <Editor />
      </Box>
    </Stack>
  );
}
