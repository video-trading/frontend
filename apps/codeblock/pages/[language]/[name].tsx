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
import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import Head from "next/head";
import path from "path";
import { useMemo, useState } from "react";
import { CodePickerInterface } from "../../lib/types/CodePicker";
import { getMenus } from "../../lib/utils/getMenus";
import fs from "fs";
import { useRouter } from "next/router";

const url = process.env.NEXT_PUBLIC_URL!;

interface Props {
  code: string;
  menus: CodePickerInterface[];
  selectedLanguage: string;
  selectedName: string;
}

const Home: NextPage<Props> = (props: Props) => {
  const { isLoading } = useCodeVisulization();
  const router = useRouter();

  const selectedMenu: CodePickerInterface = useMemo(() => {
    return props.menus.find(
      (menu) => menu.language === props.selectedLanguage
    )!;
  }, [props.selectedLanguage]);

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
            <Stack flex={3} direction="row" spacing={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Language</InputLabel>
                <Select
                  native
                  value={props.selectedLanguage}
                  onChange={(e) => {
                    router.push(`/${e.target.value}/${props.selectedName}`);
                  }}
                >
                  {props.menus.map((menu) => (
                    <option key={menu.language} value={menu.language}>
                      {menu.language}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel>File Name</InputLabel>
                <Select
                  native
                  value={props.selectedName}
                  onChange={(e) => {
                    router.push(`/${props.selectedLanguage}/${e.target.value}`);
                  }}
                >
                  {selectedMenu.files.map((file) => (
                    <option key={file} value={file}>
                      {file}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box pt={12} component="main">
        <Body language={props.selectedLanguage} code={props.code} />
      </Box>
    </div>
  );
};

interface BodyProps {
  language: string;
  code: string;
}

function Body(props: BodyProps) {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Stack p={5}>
          <Divider>Code Blocks</Divider>
          <ConfigPanel language={props.language} code={props.code} url={url} />
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

export const getStaticPaths: GetStaticPaths = () => {
  const sampleCodeFolder = path.join(process.cwd(), "sampleCode", "*");
  const menus = getMenus(sampleCodeFolder);
  const paths: any[] = [];
  menus.forEach((menu) => {
    menu.files.forEach((file) => {
      paths.push({
        params: {
          language: menu.language,
          name: file,
        },
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { name, language } = context.params!;
  const sampleCodeFolder = path.join(process.cwd(), "sampleCode", "*");
  const menus = getMenus(sampleCodeFolder);
  const code = fs.readFileSync(
    path.join(process.cwd(), "sampleCode", language as string, name as string),
    "utf8"
  );

  console.log(code);

  return {
    props: {
      menus,
      code,
      selectedLanguage: language as string,
      selectedName: name as string,
    },
  };
};
