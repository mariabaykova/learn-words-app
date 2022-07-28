import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import picture from "../../noData.jpeg";

export default function NothingFound(props) {
  const title = props.title;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
        m: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          "& > :not(style)": {
            width: { xs: 250, sm: 350, md: 400, lg: 500 },
            //   height: 300,
          },
        }}
      >
        <img src={picture} alt="card list empty"></img>
      </Box>
      <Typography variant="h5" component="div" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
}
