import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { EncodeTextContext } from "./EncodeTextContext";
import "./EncodeText.css";

function EncodeText() {
  const { text, setText } = useContext(EncodeTextContext);

  // useEffect(() => {
  //   document.addEventListener("keydown", onKeyPressed);
  // }, []);

  function enterText(e) {
    const newText = e.target.value.split("");
    setText(newText);
  }

  return (
    <React.Fragment>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        Encode Text: &nbsp; (Character count: {text.length})
      </Typography>
      <textarea
        id="encode-text"
        placeholder="Enter text to encode!"
        onChange={enterText}
      ></textarea>
      {/* <div
        id="encode-textarea"
        // onInput={enterText}
        onKeyDown={onKeyPressed}
        tabIndex="0"
        contentEditable="true"
        suppressContentEditableWarning="true"
      >
        {encodeText.map((char, index) => {
          return <span key={index}>{char}</span>;
        })}
      </div> */}
    </React.Fragment>
  );
}

export default EncodeText;
