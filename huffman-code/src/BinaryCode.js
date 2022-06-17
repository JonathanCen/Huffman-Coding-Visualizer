import React, { useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { EncodeTextContext } from "./EncodeTextContext";
import { mouseEnter, mouseLeave } from "./CodingMouseEvents";
import "./Coding.css";

function BinaryCode(props) {
  const { binaryCode } = useContext(EncodeTextContext);

  useEffect(() => {
    // console.log(`Encoding ASCII Coding: ${binaryCode}`);
  }, [binaryCode]);

  const metaInfo = `(Total bits: ${binaryCode.length * 8})`;

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
        {binaryCode.map((charCode, index) => {
          return (
            <span
              className={"coding-span"}
              onMouseEnter={(e) => mouseEnter(e)}
              onMouseLeave={(e) => mouseLeave(e)}
              id={`ascii-coding-${index}`}
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
export default BinaryCode;
