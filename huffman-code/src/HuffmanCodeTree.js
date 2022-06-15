import React from "react";
import { ButtonGroup, Button, Stack } from "@mui/material";
import "./HuffmanCodeTree.css";

function HuffmanCodeTree(props) {
  return (
    <Stack
      direction="column"
      sx={{
        margin: "10px",
        height: "100%",
      }}
    >
      <ButtonGroup
        variant="outlined"
        // color="secondary"
        aria-label="outlined primary button group"
        sx={{
          width: "100%",
        }}
      >
        <Button
          sx={{
            width: "50%",
          }}
        >
          Huffman Coding
        </Button>
        <Button
          sx={{
            width: "50%",
          }}
        >
          Adaptive Huffman Coding
        </Button>
      </ButtonGroup>
      <svg id="huffman-code-tree"></svg>
    </Stack>
  );
}

export default HuffmanCodeTree;
