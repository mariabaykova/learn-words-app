import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { editableFields, emptyFieldMsg } from "../conf/Settings";
import Validation from "../../assets/utilities/Validation";
import "@fontsource/roboto/400.css";

const sxMsgBox = {
  minWidth: 150,
  minHeight: 150,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.2rem",
  fontFamily: "Roboto",
};

const sxCardContentBox = {
  "& .MuiTextField-root": { m: 0.2 },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  flexDirection: "column",
};

const sxCard = {
  minWidth: 150,
  minHeight: 150,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

const sxCardActions = { display: "flex", justifyContent: "space-between" };

export default function WordCardEdit(props) {
  const { wordCard, onLiftDelCardId } = props;
  //   вводим состояние - "изменения сохранены"
  const [saved, setSaved] = React.useState(false);
  // изменения сохранены при клике на иконку "сохранить" SaveIcon
  const handleSaveClick = (e) => {
    e.preventDefault(); // 👈️ prevent page refresh

    // проверка корректности заполнения полей + сразу обновление состояния с ошибками
    setInputErrorsState((prevState) => {
      let errInd = 0;
      for (let key in prevState) {
        prevState[key] = "";
        if (Validation.isEmpty(inputsState[key])) {
          prevState[key] = emptyFieldMsg;
          errInd++;
        } else if (!Validation.isFormatCorrect(inputsState[key], key)) {
          prevState[key] = editableFields[key].regexpMsg;
          errInd++;
        }
      }
      if (!errInd) {
        setSaved((prevState) => !prevState);
      }

      return { ...prevState };
    });
  };

  // вводим состояние "карточка удалена"
  const [isDeleted, setDeleted] = React.useState(false);
  // считаем, что удалена при клике на DeleteIcon
  const handleDeleteClick = () => {
    setDeleted(true);
    onLiftDelCardId(wordCard.id);
  };

  // состояние редактируемых полей

  const [inputsState, setInputsState] = React.useState({
    [editableFields.englishWord.id]: wordCard.english,
    [editableFields.transcription.id]: wordCard.transcription,
    [editableFields.russianWord.id]: wordCard.russian,
  });

  // состояние ошибок в редактируемых полях, сначала их нет
  const [inputErrorsState, setInputErrorsState] = React.useState({
    [editableFields.englishWord.id]: "",
    [editableFields.transcription.id]: "",
    [editableFields.russianWord.id]: "",
  });

  const handleInputChange = (e) => {
    const id = e.target.id;
    const val = e.target.value;

    setInputsState((prevState) => {
      prevState[id] = val;
      return { ...prevState };
    });
  };

  return (
    <Card sx={sxCard} component="form" onSubmit={handleSaveClick}>
      {isDeleted ? (
        <Box sx={sxMsgBox}>Card has been removed</Box>
      ) : (
        <CardContent>
          <Box sx={sxCardContentBox} autoComplete="off">
            <TextField
              label={editableFields.englishWord.label}
              variant={editableFields.englishWord.variant}
              id={editableFields.englishWord.id}
              size={editableFields.englishWord.size}
              onChange={handleInputChange}
              value={inputsState.englishWord}
              error={Boolean(inputErrorsState.englishWord.length)}
              helperText={inputErrorsState.englishWord}
            />
            <TextField
              label={editableFields.transcription.label}
              variant={editableFields.transcription.variant}
              id={editableFields.transcription.id}
              size={editableFields.transcription.size}
              onChange={handleInputChange}
              value={inputsState.transcription}
              error={Boolean(inputErrorsState.transcription.length)}
              helperText={inputErrorsState.transcription}
            />
            <TextField
              label={editableFields.russianWord.label}
              variant={editableFields.russianWord.variant}
              id={editableFields.russianWord.id}
              size={editableFields.russianWord.size}
              onChange={handleInputChange}
              value={inputsState.russianWord}
              error={Boolean(inputErrorsState.russianWord.length)}
              helperText={inputErrorsState.russianWord}
            />
          </Box>
        </CardContent>
      )}
      {!isDeleted && (
        <CardActions sx={sxCardActions}>
          {saved ? (
            <DoneIcon />
          ) : (
            // кнопка - сохранить изменения
            <IconButton aria-label="save" type="submit">
              <SaveIcon />
            </IconButton>
          )}

          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}
