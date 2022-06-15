import React, { useState, useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { EncodeTextContext } from "./EncodeTextContext";
import "./Encoding.css";

function Encoding(props) {
  const { encodeText, updateEncodeText } = useContext(EncodeTextContext);
  // const [ascciSpanHover, setAscciSpanHover] = useState("");
  // const [huffmanSpanHover, setHuffmanSpanHover] = useState("");

  // useEffect(() => {
  //   console.log(`Encoding ${props.encodingName}: ${encodeText}`);
  // }, [encodeText, props.encodingName]);

  return (
    <div>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        {props.encodingName}:
      </Typography>
      <div disabled id="encoding-div">
        {encodeText.map((charEncodingCode, index) => {
          return (
            <span
              className={"encoding-span"}
              onMouseEnter={(e) => {
                // const hoverElementId = e.target.id;
                const id = e.target.id.split("-")[2];
                document
                  .getElementById(`ascci-coding-${id}`)
                  .classList.add("encoding-span-hover");
                document
                  .getElementById(`huffman-coding-${id}`)
                  .classList.add("encoding-span-hover");
              }}
              onMouseLeave={(e) => {
                const id = e.target.id.split("-")[2];
                document
                  .getElementById(`ascci-coding-${id}`)
                  .classList.remove("encoding-span-hover");
                document
                  .getElementById(`huffman-coding-${id}`)
                  .classList.remove("encoding-span-hover");
              }}
              id={
                props.encodingName === "ASCII Coding"
                  ? `ascci-coding-${index}`
                  : `huffman-coding-${index}`
              }
              key={index}
            >
              {charEncodingCode}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
}
export default Encoding;
