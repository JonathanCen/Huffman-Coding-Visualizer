import React from "react";
import { Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./ContactInfo.css";

function ContactInfo() {
  return (
    <Stack direction="row" justifyContent="space-evenly" alignItems="center">
      <Typography variant="subtitle1">
        <a
          id="github-link"
          href="https://github.com/JonathanCen/Huffman-Coding-Visualizer"
        >
          Source Code <GitHubIcon fontSize="small" />
        </a>
      </Typography>
      <Typography variant="overline">
        <a id="personal-page-link" href="https://jonathancen.me/">
          Jonathan Cen
        </a>
      </Typography>
    </Stack>
  );
}

export default ContactInfo;
