import { Box, Button, Stack } from "@mui/material";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import path from "path";
import { CodePickerInterface } from "../lib/types/CodePicker";
import { getMenus } from "../lib/utils/getMenus";

interface Props {
  menus: CodePickerInterface[];
}

const Home: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  return (
    <Stack
      height={"100vh"}
      width="100vw"
      alignContent="center"
      justifyContent={"center"}
    >
      <Box display={"flex"} alignContent="center" justifyContent={"center"}>
        <Button
          variant="contained"
          onClick={() => {
            router.push(
              `/${props.menus[0].language}/${props.menus[0].files[0]}`
            );
          }}
        >
          Explore CodeBlock
        </Button>
      </Box>
    </Stack>
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
