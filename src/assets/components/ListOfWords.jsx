import * as React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import WordCardMini from "./WordCardMini.jsx";

export default function ListOfWords() {
  const { listOfWords = [] } = useSelector((state) => state.listOfWords);

  console.log("listOfWords 1");
  console.log(listOfWords);

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          padding: 1.5,
        }}
      >
        {listOfWords.map((wCard, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <WordCardMini wordCard={wCard} />
          </Grid>
          // }
        ))}
      </Grid>
    </Box>
  );
}
