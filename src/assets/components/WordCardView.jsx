import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ShowTranslIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";

export default function WordCardView(props) {
  // console.log("WordCardView start");
  const {
    english,
    russian,
    transcription,
    showTransl,
    id,
    onShowHideTranslation,
  } = props;
  //   передаем в компонент состояние - показывать перевод или нет
  //   в зависимости от этого признака будем показывать или скрывать перевод и транскрипцию, по дефолту - скрыто
  const [showTranslation, setShowTranslation] = React.useState(
    showTransl || false
  );
  const handleShowTranslation = () => {
    setShowTranslation((prevState) => !prevState);
    console.log("поднимаем значение " + id);
    onShowHideTranslation(id);
  };

  // console.log("WordCardView showTranslation " + showTranslation);
  return (
    <Card
      sx={{
        minWidth: 150,
        minHeight: 130,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <CardContent sx={{}}>
        <Typography variant="h5" component="div">
          {english}
        </Typography>
        {showTranslation ? (
          <Box component="div">
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {transcription}
            </Typography>
            <Typography variant="body2">{russian}</Typography>
            <IconButton aria-label="hide" onClick={handleShowTranslation}>
              <ShowTranslIcon sx={{ transform: "rotate(180deg)" }} />
            </IconButton>
          </Box>
        ) : (
          <Box component="div">
            <IconButton aria-label="show" onClick={handleShowTranslation}>
              <ShowTranslIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
