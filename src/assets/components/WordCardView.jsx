import * as React from "react";
import Box from "@mui/material/Box";
import TrapFocus from "@mui/base/FocusTrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ShowTranslIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";

const sxCard = {
  minWidth: 150,
  minHeight: 130,
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
};
const sxTypography = { mb: 1.5 };

export default function WordCardView(props) {
  const {
    wordCard,
    showTranslationFlag,
    onShowHideTranslation,
    disableAutoFocus = false,
  } = props;

  //   передаем в компонент состояние - показывать перевод или нет
  //   в зависимости от этого признака будем показывать или скрывать перевод и транскрипцию, по дефолту - скрыто
  const [showTranslation, setShowTranslation] = React.useState(
    showTranslationFlag || false
  );
  const handleShowTranslation = () => {
    setShowTranslation((prevState) => !prevState);
    onShowHideTranslation(wordCard.id);
  };

  return (
    <Card sx={sxCard}>
      <CardContent>
        <Typography variant="h5" component="div">
          {wordCard.english}
        </Typography>
        {showTranslation ? (
          <Box component="div">
            <Typography sx={sxTypography} color="text.secondary">
              {wordCard.transcription}
            </Typography>
            <Typography variant="body2">{wordCard.russian}</Typography>

            <TrapFocus open={Boolean(!disableAutoFocus)}>
              <IconButton aria-label="hide" onClick={handleShowTranslation}>
                <ShowTranslIcon sx={{ transform: "rotate(180deg)" }} />
              </IconButton>
            </TrapFocus>
          </Box>
        ) : (
          <Box component="div">
            <TrapFocus open={Boolean(!disableAutoFocus)}>
              <IconButton aria-label="show" onClick={handleShowTranslation}>
                <ShowTranslIcon />
              </IconButton>
            </TrapFocus>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
