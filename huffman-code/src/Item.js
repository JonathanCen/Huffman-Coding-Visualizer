import React from "react";
import { Paper } from "@mui/material";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: "10px",
//   paddingRight: "23px",
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

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
