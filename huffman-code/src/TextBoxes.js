import React, { useContext } from "react";
import { Stack } from "@mui/material";
import Item from "./Item";
import EncodeText from "./EncodeText";
import InputText from "./InputText";
import BinaryCode from "./BinaryCode";
import HuffmanCoding from "./HuffmanCoding";
import { HuffmanCodeVariationContext } from "./HuffmanCodeVariationContext";

function TextBoxes() {
  const { huffmanVariation } = useContext(HuffmanCodeVariationContext);
  
  return (
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
  )
}

export default TextBoxes;