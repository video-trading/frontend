import { Button, IconButton, InputBase, Stack } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchField() {
  return (
    <Stack direction={"row"}>
      <InputBase
        placeholder="Search"
        sx={{ background: "black", minWidth: 500, p: 1 }}
      />
      <Button variant="contained">
        <SearchIcon />
      </Button>
    </Stack>
  );
}
