import React, { useState } from "react";
import { Typography } from "@mui/material";
import "./EncodeText.css";

function EncodeText(props) {
  const [encodeText, setEncodeText] = useState([]);

  function enterText(e) {
    const newText = e.target.value;
    setEncodeText(newText.split(""));
  }

  return (
    <div>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        Encode Text: {encodeText}
      </Typography>
      <textarea
        id="encode-text"
        placeholder="Enter text to encode!"
        onChange={enterText}
      ></textarea>
    </div>
  );
}

export default EncodeText;
