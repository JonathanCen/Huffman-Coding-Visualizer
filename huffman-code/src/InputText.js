import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { EncodeTextContext } from "./EncodeTextContext";
import { mouseEnter, mouseLeave } from "./CodingMouseEvents";
import "./Coding.css";

function InputText() {

  const { text } = useContext(EncodeTextContext);

  return (
    <React.Fragment>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        Input Text: &nbsp; (Character count: {text.length})
      </Typography>
      <div className="coding-div">
        {text.map((char, index) => {
          return (
            <span
              className={"coding-span"}
              onMouseEnter={(e) => mouseEnter(e)}
              onMouseLeave={(e) => mouseLeave(e)}
              id={`text-coding-${index}`}
              key={index}
            >
              &nbsp; '{char === ' ' ? 'Space' : char}' &nbsp;
            </span>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default InputText;
