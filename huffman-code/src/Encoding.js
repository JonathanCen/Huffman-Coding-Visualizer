import React, { useState } from "react";
import { Typography } from "@mui/material";
import "./Encoding.css";

function Encoding(props) {
  const [asciiCoding, setasciiCoding] = useState([
    "ASCII coding will populate when you enter text in encode text!",
    "asdf",
    "asdf",
    "f",
    "fd",
    "asdf",
    "ASCII coding will populate when you enter text in encode text!",
    "asdf",
    "asdf",
    "f",
    "fd",
    "asdf",
    "ASCII coding will populate when you enter text in encode text!",
    "asdf",
    "asdf",
    "f",
    "fd",
    "asdf",
    "ASCII coding will populate when you enter text in encode text!",
    "asdf",
    "asdf",
    "f",
    "fd",
    "asdf",
    "ASCII coding will populate when you enter text in encode text!",
    "asdf",
    "asdf",
    "f",
    "fd",
    "asdf",
    "ASCII coding will populate when you enter text in encode text!",
    "asdf",
    "asdf",
    "f",
    "fd",
    "asdf",
    "ASCII coding will populate when you enter text in encode text!",
    "asdf",
    "asdf",
    "f",
    "fd",
    "asdf",
  ]);

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
      <div id="encoding-div">
        {asciiCoding.map((char, index) => {
          return <span key={index}>{char}</span>;
        })}
      </div>
    </div>
  );
}
export default Encoding;
