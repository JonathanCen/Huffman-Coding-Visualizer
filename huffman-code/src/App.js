import React, { useContext } from "react";
import { Stack, Typography, Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import { HuffmanCodeVariationContext } from "./HuffmanCodeVariationContext";

import EncodeText from "./EncodeText";
import InputText from "./InputText";
import BinaryCode from "./BinaryCode";
import HuffmanCoding from "./HuffmanCoding";
import HuffmanCodeTree from "./HuffmanCodeTree";
import Item from "./Item";


import "./App.css";


function App() {
  const { huffmanVariation } = useContext(HuffmanCodeVariationContext);

  return (
    <Grid
      container
      direction="row"
      spacing={3}
      wrap="wrap"
      sx={{
        padding: "5px",
      }}
    >
      <Grid item xs={12}>
        <Typography id="app-title" variant="h4" component="h4">
          <a id="app-title-anchor" href="http://localhost:3000/">
            Huffman Code Visualizer
          </a>
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            margin: "7px",
          }}
        >
          <Item> <EncodeText /> </Item>
          <Item> <InputText /> </Item>
          <Item> <BinaryCode codingName="Binary Coding" /> </Item>
          <Item> <HuffmanCoding codingName={huffmanVariation} /> </Item>
        </Stack>
      </Grid>
      <Grid item xs={7}>
        <Item rightPadding="10px" id="huffman-code-tree" height="100%"> <HuffmanCodeTree /> </Item>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Typography variant="subtitle1">
            <a id="github-link" href="https://github.com/">
              Source Code <GitHubIcon fontSize="small" />
            </a>
          </Typography>
          <Typography variant="overline">
            <a id="personal-page-link" href="https://google.com/">
              Jonathan Cen
            </a>
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default App;
