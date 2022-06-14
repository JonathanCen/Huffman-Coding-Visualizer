import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "./App.css";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import EncodeText from "./EncodeText";
import Encoding from "./Encoding";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <Grid container direction="row" spacing={4} wrap="wrap">
      <Grid item xs={12}>
        <Typography id="app-title" variant="h4" component="h4">
          Huffman Code
        </Typography>
      </Grid>
      <Grid item>
        <Stack
          direction="column"
          spacing={3}
          sx={{
            margin: "10px",
          }}
        >
          <Item>
            <EncodeText />
          </Item>
          <Item>
            <Encoding encodingName="ASCII Coding" />
          </Item>
          <Item>
            <Encoding encodingName="Huffman Coding" />
          </Item>
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction="column" spacing={3}>
          <Item>Item 1</Item>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default App;
