import * as React from "react";
import { useDispatch } from "react-redux";
import { addWordAction } from "../../store/wordsReducer";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";
import ErrIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { editableFields, emptyFieldMsg } from "../conf/Settings";
import Validation from "../../assets/utilities/Validation";
import postServices from "../../Api/postServices";
import "@fontsource/roboto/400.css";

const sxCardContentBox = {
  "& .MuiTextField-root": { m: 0.2 },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  flexDirection: "column",
};

const sxCard = {
  width: { xs: 8 / 8, sm: 1 / 2, md: 1 / 3 },
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

const sxCardActions = { display: "flex", justifyContent: "space-between" };

// настройка всплывающего сообщения об ошибке при отправке запроса
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const { vertical, horizontal } = { vertical: "top", horizontal: "center" };

export default function WordCardAdd() {
  const dispatch = useDispatch();

  //   вводим состояние - 1="изменения сохранены", 2="ошибка при сохранении изменений", 0="не сохранены"( по дефолту = 0 )
  const [saved, setSaved] = React.useState(0);
  // при клике на иконку "сохранить" SaveIcon происходит валидация формы и отправка запроса на сервер
  const handleSaveClick = async (e) => {
    e.preventDefault();

    // проверка корректности заполнения полей + сразу обновление состояния с ошибками
    setInputErrorsState((prevState) => {
      for (let key in inputsState) {
        delete prevState[key];
        if (Validation.isEmpty(inputsState[key])) {
          prevState[key] = emptyFieldMsg;
        } else if (!Validation.isFormatCorrect(inputsState[key], key)) {
          prevState[key] = editableFields[key].regexpMsg;
        }
      }
      // если нет ошибок в заполнении полей
      return { ...prevState };
    });

    if (Validation.isEmptyObj(inputErrorsState)) {
      //нет ошибок в заполнении полей => отправляем запрос на изменение карточки
      const addList = await postServices.addWordCard(inputsState);

      if (addList.error) {
        setSaved(2);
      } else {
        dispatch(addWordAction(inputsState));
        setSaved(1);
      }
    }
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSaved(0);
  };

  // состояние редактируемых полей
  const [inputsState, setInputsState] = React.useState({
    [editableFields.english.id]: "",
    [editableFields.transcription.id]: "",
    [editableFields.russian.id]: "",
    [editableFields.tags.id]: "",
  });

  // состояние ошибок в редактируемых полях, сначала их нет
  const [inputErrorsState, setInputErrorsState] = React.useState({});

  const handleInputChange = (e) => {
    const id = e.target.id;
    const val = e.target.value;

    setInputsState((prevState) => {
      prevState[id] = val;
      return { ...prevState };
    });
  };

  return (
    <Card
      sx={sxCard}
      component="form"
      name="word-card"
      onSubmit={handleSaveClick}
    >
      <CardContent>
        <Box sx={sxCardContentBox} autoComplete="off">
          <TextField
            disabled={saved === 2 || saved === 1}
            label={editableFields.english.label}
            id={editableFields.english.id}
            helperText={inputErrorsState[editableFields.english.id]}
            onChange={handleInputChange}
            value={inputsState[editableFields.english.id]}
            error={inputErrorsState[editableFields.english.id] ? true : false}
            variant="filled"
            size="small"
          />
          <TextField
            disabled={saved === 2 || saved === 1}
            label={editableFields.transcription.label}
            id={editableFields.transcription.id}
            onChange={handleInputChange}
            value={inputsState[editableFields.transcription.id]}
            error={
              inputErrorsState[editableFields.transcription.id] ? true : false
            }
            helperText={inputErrorsState[editableFields.transcription.id]}
            variant="filled"
            size="small"
          />
          <TextField
            disabled={saved === 2 || saved === 1}
            label={editableFields.russian.label}
            id={editableFields.russian.id}
            onChange={handleInputChange}
            value={inputsState[editableFields.russian.id]}
            error={inputErrorsState[editableFields.russian.id] ? true : false}
            helperText={inputErrorsState[editableFields.russian.id]}
            variant="filled"
            size="small"
          />
          <TextField
            disabled={saved === 2 || saved === 1}
            label={editableFields.tags.label}
            id={editableFields.tags.id}
            helperText={inputErrorsState[editableFields.tags.id]}
            onChange={handleInputChange}
            value={inputsState[editableFields.tags.id]}
            error={inputErrorsState[editableFields.tags.id] ? true : false}
            variant="filled"
            size="small"
          />
        </Box>
      </CardContent>

      <CardActions sx={sxCardActions}>
        {saved === 1 ? (
          <DoneIcon />
        ) : saved === 2 ? (
          <React.Fragment>
            <Snackbar
              open={saved === 2}
              autoHideDuration={6000}
              onClose={handleCloseError}
              anchorOrigin={{ vertical, horizontal }}
              key={vertical + horizontal}
            >
              <Alert
                onClose={handleCloseError}
                severity="error"
                sx={{ width: "100%" }}
              >
                Network problem, try again later!
              </Alert>
            </Snackbar>

            <ErrIcon />
          </React.Fragment>
        ) : (
          // кнопка - сохранить изменения
          <IconButton aria-label="save" type="submit">
            <SaveIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
