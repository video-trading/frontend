import { Box, Button, Stack } from "@mui/material";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import path from "path";
import Cards from "../components/home/Cards";
import Intro from "../components/home/Intro";
import Skills from "../components/home/Skills";
import { CodePickerInterface } from "../lib/types/CodePicker";
import { getMenus } from "../lib/utils/getMenus";

interface Props {
  menus: CodePickerInterface[];
}

const Home: NextPage<Props> = (props: Props) => {
  const router = useRouter();

  return (
    <Box>
      <Intro
        onClick={() => {
          router.push(`/${props.menus[0].language}/${props.menus[0].files[0]}`);
        }}
      />
      <Skills />
      <Cards data={props.menus.map((m) => m.language)} />
    </Box>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const sampleCodeFolder = path.join(process.cwd(), "sampleCode", "*");
  const menus = getMenus(sampleCodeFolder);

  return {
    props: {
      menus,
    },
  };
};
