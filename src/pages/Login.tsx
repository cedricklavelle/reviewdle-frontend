import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";

const Login = () => {
  return (
      <Stack      spacing={2} pt={30}  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} direction="column">
        <TextField label="Username"></TextField>
        <TextField label="Password"></TextField>
        <Button variant="contained">Log in with google</Button>
      </Stack>

  );
};

export default Login;
