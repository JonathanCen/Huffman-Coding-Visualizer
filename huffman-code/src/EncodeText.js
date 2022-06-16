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
<<<<<<< HEAD
        Encode Text: &nbsp; (Character count: {encodeText.length})
=======
        Encode Text: &nbsp; &nbsp;&nbsp; (Character count: {text.length})
>>>>>>> 7b2a2a02a60be04603e6c63f7fb0ce1ffd2f27dd
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
