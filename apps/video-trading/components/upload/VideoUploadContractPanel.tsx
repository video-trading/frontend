import Editor from "@monaco-editor/react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Contract } from "client";
import React, { useState } from "react";
import { useContract } from "../../hooks/useContract";

export default function VideoUploadContractPanel() {
  const { data, error, isLoading } = useContract();
  const [selectedContract, setSelectedContract] = useState<Contract>();
  const [selectedIndex, setSelectedIndex] = useState<string>();

  return (
    <>
      <Collapse in={isLoading} mountOnEnter unmountOnExit>
        <Box
          width={"100%"}
          justifyItems="center"
          display={"flex"}
          justifyContent="center"
        >
          <CircularProgress />{" "}
        </Box>
      </Collapse>
      <Collapse in={Boolean(error)} mountOnEnter unmountOnExit>
        <Box>
          <Alert severity="error">{JSON.stringify(error)}</Alert>
        </Box>
      </Collapse>
      <Collapse in={data !== undefined} mountOnEnter unmountOnExit>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={600}>
                Contract
              </Typography>
              <Typography>Choose the sale mode for your video.</Typography>
              <Card>
                <CardContent>
                  <FormControl>
                    <FormLabel>Contract</FormLabel>
                    <Typography variant="subtitle2">
                      Please pick one of the contracts from below
                    </Typography>
                    <RadioGroup
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={selectedIndex}
                      onChange={(e, value) => {
                        setSelectedContract(data![parseInt(value)]);
                        setSelectedIndex(value);
                      }}
                    >
                      {data?.map((data, index) => (
                        <FormControlLabel
                          key={index}
                          value={index}
                          control={<Radio />}
                          label={data.name}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
              <Collapse
                in={selectedContract !== undefined}
                mountOnEnter
                unmountOnExit
              >
                <Card variant="outlined">
                  <CardContent>
                    <Typography>Contract Description</Typography>
                    <Typography>{selectedContract?.description}</Typography>
                  </CardContent>
                </Card>
              </Collapse>
            </Stack>
          </Grid>
          <Grid item xs={6} height="90vh">
            {selectedContract && (
              <Editor
                height="90vh"
                defaultLanguage="sol"
                value={selectedContract.code}
                theme="vs-dark"
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
              />
            )}
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}
