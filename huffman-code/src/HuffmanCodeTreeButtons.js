import React, { useContext } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { HuffmanCodeVariationContext } from "./HuffmanCodeVariationContext";

function HuffmanCodeTreeButtons(props) {
  const { huffmanVariation, setHuffmanVariation } = useContext(
    HuffmanCodeVariationContext
  );

  const toggleButtons = (e) => {
    setHuffmanVariation(e.target.value);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={huffmanVariation}
      exclusive
      onChange={toggleButtons}
      sx={{
        width: "100%",
      }}
    >
      <ToggleButton
        value="Huffman Coding"
        sx={{
          width: "50%",
        }}
      >
        Huffman Coding
      </ToggleButton>
      <ToggleButton
        value="Adaptive Huffman Coding"
        sx={{
          width: "50%",
        }}
      >
        Adaptive Huffman Coding
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default HuffmanCodeTreeButtons;
