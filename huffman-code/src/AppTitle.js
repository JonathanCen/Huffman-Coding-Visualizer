import React from 'react';
import { Typography } from "@mui/material";
import "./AppTitle.css";

function AppTitle() {
  return (
    <Typography id="app-title" variant="h4" component="h4">
      <a id="app-title-anchor" href="http://localhost:3000/">
        Huffman Code Visualizer
      </a>
    </Typography>
  );
}

export default AppTitle;