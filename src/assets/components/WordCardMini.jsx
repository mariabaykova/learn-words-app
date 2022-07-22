import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/ReadMoreRounded";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

import WordCardView from "./WordCardView";
import WordCardEdit from "./WordCardEdit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // minWidth: 1 / 4,
  // width: AutoAwesome,
  // minWidth={{ xs: "3 / 4", md: "1 / 4" }},
  width: 1 / 2,
  bgcolor: "background.paper",
  border: "2px solid gray",
  borderRadius: 3,
  boxShadow: 24,
  // p: 4,
};

export default function WordCardMini(props) {
  const [editMode, setEditMode] = React.useState(false);

  // состояние open отвечает за открытие модального окна, если true - открыть окно
  const [open, setOpen] = React.useState(false);
  // при клике на иконку просмотра переводим в состояние "открыть модальное окно", без перехода в режим редактирования считаем, что это режим просмотра
  const handleViewClick = () => setOpen(true);
  // при клике на иконку редактирования переводим в состояние "открыть модальное окно" и "режим редактирования"
  const handleEditClick = () => {
    setOpen(true);
    setEditMode(true);
  };
  // при закрытии модального окна еще и выходим из состояния редактирования
  const handleCloseWin = () => {
    setOpen(false);
    setEditMode(false);
  };

  // const classNameModal = classnames(styles.modalwin);
  return (
    <div>
      <Card
        sx={{
          minWidth: 150,
          "&:hover": {
            mt: -0.5,
            mx: -0.5,
            boxShadow: 24,

            zIndex: "tooltip",
            cursor: "pointer",
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {props.english}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton aria-label="edit" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="view" onClick={handleViewClick}>
            <ViewIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseWin}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* тут проверяем, что нужно показать в окне: форму просмотра или форму редактирования */}
            {editMode ? (
              <WordCardEdit
                english={props.english}
                russian={props.russian}
                transcription={props.transcription}
              />
            ) : (
              <WordCardView
                english={props.english}
                russian={props.russian}
                transcription={props.transcription}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
