import { styled } from "@mui/system";
import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import Logo from "../../../public/assets/logo.svg";

// const Typography = styled(MuiTypography)(({ theme }) => ({
//   backgroundColor: theme.palette.activePlayerText,
// }));

function StartGame() {
  return (
    <Box sx={{ backgroundColor: "#152938" }}>
      <Box>
        <img src={Logo}></img>
      </Box>
      <Stack sx={{ backgroundColor: " white" }}>
        <Stack>
          <Typography>some text here</Typography>
          <Stack></Stack>
        </Stack>
        <Stack></Stack>
        <Stack></Stack>
        <Button></Button>
      </Stack>
    </Box>
  );
}

export default StartGame;
