import React from "react";
import {  Grid } from "@mui/material";

import Item from "./Item";
import AppTitle from "./AppTitle";
import TextBoxes from "./TextBoxes";
import HuffmanCodeTree from "./HuffmanCodeTree";
import ContactInfo from "./ContactInfo";

function App() {


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
      {/* Top: App Title */}
      <Grid item xs={12}><AppTitle/></Grid>
      {/* Middle: Textboxes (on the left) and HuffmanTree Visualizer (on the right) */}
      <Grid item xs={5}><TextBoxes/></Grid>
      <Grid item xs={7}>
        <Item rightPadding="10px" id="huffman-code-tree" height="100%"> <HuffmanCodeTree /> </Item>
      </Grid>
      {/* Bottom: Source Code / Contact Info */}
      <Grid item xs={12}><ContactInfo/></Grid>
    </Grid>
  );
}

export default App;
