import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import WordCardMini from "./WordCardMini.jsx";

export default function ListOfWords(props) {
  const { listOfWords = [], deletedCardsList = [], onClickDelete } = props;

  // const [deletedCard, setDeletedCard] = React.useState(null);
  // setDeletedCard(onClickDelete(deletedCard));

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
          // {(deletedCardsList.includes(wCard.id)) &&
          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            key={index}
            sx={{
              visibility: !deletedCardsList.includes(wCard.id)
                ? "visible"
                : "hidden",
            }}
          >
            <WordCardMini
              english={wCard.english}
              transcription={wCard.transcription}
              russian={wCard.russian}
              // tags={wCard.tags}
              id={wCard.id}
              ind={index}
            />
          </Grid>
          // }
        ))}
      </Grid>
    </Box>
  );
}
