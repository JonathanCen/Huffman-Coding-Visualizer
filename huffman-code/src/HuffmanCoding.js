import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { EncodeTextContext } from "./EncodeTextContext";
import { mouseEnter, mouseLeave } from "./CodingMouseEvents";
import "./Coding.css";

function HuffmanCoding(props) {
  const { huffmanCoding, huffmanTreePaths } = useContext(EncodeTextContext);

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
        {huffmanCoding.map((charCode, index) => {
          return (
            <span
              className={"coding-span"}
              onMouseEnter={(e) => mouseEnter(e, huffmanTreePaths)}
              onMouseLeave={(e) => mouseLeave(e, huffmanTreePaths)}
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
