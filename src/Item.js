import React from "react";
import { Paper } from "@mui/material";

function Item(props) {
  const rightPadding =
    props.rightPadding === undefined ? "23px" : props.rightPadding;
  const height = props.height === undefined ? "auto" : props.height;
  return (
    <Paper
      elevation={8}
      sx={{
        height: height,
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
        paddingRight: rightPadding,
      }}
    >
      {props.children}
    </Paper>
  );
}

export default Item;
