import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const sxImgBox = {
  display: "flex",
  justifyContent: "center",
  "& > :not(style)": {
    width: { xs: 250, sm: 350, md: 400, lg: 500 },
  },
};
const sxBoxWrap = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  flexDirection: "column",
  m: 2,
};

export default function NothingFound(props) {
  const { title = "Ooops!", picture } = props;
  return (
    <Box sx={sxBoxWrap}>
      <Box sx={sxImgBox}>
        <img src={picture} alt="card list empty"></img>
      </Box>
      <Typography variant="h5" component="div" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
}
