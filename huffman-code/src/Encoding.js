import React, { useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { EncodeTextContext } from "./EncodeTextContext";
import "./Encoding.css";

function Encoding(props) {
  const { encodeText } = useContext(EncodeTextContext);

  useEffect(() => {
    console.log(`Encoding ${props.encodingName}: ${encodeText}`);
  }, [encodeText, props.encodingName]);

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
      <div
        disabled
        id="encoding-div"
        contentEditable="true"
        suppressContentEditableWarning={true}
      >
        {encodeText.map((char, index) => {
          return <span key={index}>{char}</span>;
        })}
        {/* {encodeText} */}
      </div>
    </div>
  );
}
export default Encoding;
