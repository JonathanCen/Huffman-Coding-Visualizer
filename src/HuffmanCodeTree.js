import React from "react";
import { Stack } from "@mui/material";
import "./HuffmanCodeTree.css";
import HuffmanCodeTreeButtons from "./HuffmanCodeTreeButtons";

function HuffmanCodeTree() {
  return (
    <Stack
      direction="column"
      sx={{
        margin: "10px",
        height: "100%",
      }}
    >
      <HuffmanCodeTreeButtons />
      <svg id="huffman-code-tree"></svg>
    </Stack>
  );
}

export default HuffmanCodeTree;
