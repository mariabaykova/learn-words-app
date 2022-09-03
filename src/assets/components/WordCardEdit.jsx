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

export default function WordCardEdit(props) {
  const { english, russian, transcription, id, onLiftDelCardId } = props;
  //   вводим состояние - "изменения сохранены"
  const [saved, setSaved] = React.useState(false);
  // изменения сохранены при клике на иконку "сохранить" SaveIcon
  const handleSaveClick = () => {
    setSaved((prevState) => !prevState);
  };

  // вводим состояние "карточка удалена"
  const [isDeleted, setDeleted] = React.useState(false);
  // считаем, что удалена при клике на DeleteIcon
  const handleDeleteClick = () => {
    setDeleted(true);
    onLiftDelCardId(id);
  };
  return (
    <Card
      sx={{
        minWidth: 150,
        minHeight: 150,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      {isDeleted ? (
        <Box
          sx={{
            minWidth: 150,
            minHeight: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Карточка была удалена
        </Box>
      ) : (
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 0.2 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="wordEng"
              size="small"
              defaultValue={english}
            />
            <TextField
              required
              id="wordTrnscr"
              size="small"
              // className={styles.input}
              defaultValue={transcription}
            />
            <TextField
              required
              id="wordRus"
              size="small"
              // className={styles.input}
              defaultValue={russian}
            />
          </Box>
        </CardContent>
      )}
      {!isDeleted && (
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          {saved ? (
            <DoneIcon />
          ) : (
            <IconButton aria-label="save" onClick={handleSaveClick}>
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
