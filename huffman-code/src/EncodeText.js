import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { EncodeTextContext } from "./EncodeTextContext";
import "./EncodeText.css";

function EncodeText(props) {
  const { updateEncodeText } = useContext(EncodeTextContext);

  function enterText(e) {
    const newText = e.target.value;
    updateEncodeText(newText.split(""));
  }

  return (
    <div>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        Encode Text:
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
