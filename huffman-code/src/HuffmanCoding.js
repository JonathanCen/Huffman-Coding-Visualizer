import React, { useState, useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { EncodeTextContext } from "./EncodeTextContext";
import { mouseEnter, mouseLeave } from "./CodingMouseEvents";
import "./Coding.css";

function HuffmanCoding(props) {
  const { text, huffmanCoding } = useContext(EncodeTextContext);

  useEffect(() => {
    console.log(`Coding Huffman: ${text}`);
  }, [text]);

  const metaInfo = `(Total bits: 0)`;

  return (
    <div>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        {props.codingName}: &nbsp; {metaInfo}
      </Typography>
      <div disabled className="coding-div">
        {text.map((charCode, index) => {
          return (
            <span
              className={"coding-span"}
              onMouseEnter={(e) => mouseEnter(e)}
              onMouseLeave={(e) => mouseLeave(e)}
              id={`huffman-coding-${index}`}
              key={index}
            >
              {charCode}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
}
export default HuffmanCoding;
