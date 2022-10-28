import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import WordCardMini from "./WordCardMini.jsx";

import wordsContext from "./Context.jsx";

export default function ListOfWords() {
  // const { listOfWords = [] } = props;
  console.log("wordsContext");
  console.log(wordsContext);
  const listOfWords = React.useContext(wordsContext);
  console.log("function ListOfWords(): listOfWords ");
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
