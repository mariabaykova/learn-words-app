import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import WordCardView from "./WordCardView.jsx";
import NothingFound from "./NothingFound.jsx";
import Utilities from "../utilities/Utilities.js";
import picNoData from "../../noData.jpeg";

export default function FlippingCards(props) {
  // если ничего не передали, значит считаем список пустым
  const { listOfWords = [] } = props;

  // в состоянии этого компонента хранится индекс карточки, которую нужно показать
  // нажатие на стрелки двигает этот индекс и при отрисовке показывается карточка с нужным индексом
  const [cardToShow, setCardToShow] = React.useState(0);

  // определить длину переданного списка.
  const listLength = listOfWords.length;
  // если список пуст, выдать сообщение и не показывать стрелки и карточку
  // показать картинку с изображением "ничего нет"

  // если текущий индекс = 0, то стрелку назад не показывать
  // если текущий индекс равен длине списка - 1, то не показываем стрелку вперед

  // для маленьких экранов - не показывать стрелки, а показать перелистывание

  // Мы будем хранить карточки, для которых пользователь открыл перевод во внутреннем состоянии этого компонента
  // это состояние, которое мы поднимаем из карточек показа слов WordCardView
  const [showTranslationList, setShowTranslation] = React.useState([]);
  const [learnedWordsList, setLearnedWords] = React.useState([]);

  function handleShowHideTranslation(cardId) {
    setShowTranslation(
      // здесь prevState - это предыдущее состояние списка
      (prevState) => {
        return Utilities.UpdateArray(prevState, cardId);
      }
    );
    setLearnedWords((prevState) => {
      return Utilities.PushToArray(prevState, cardId);
    });
  }

  const learnedWordsNumber = learnedWordsList.length || 0;

  // прослушивание документа на нажатие стрелок влево-вправо, чтобы стрелками можно было листать список
  React.useEffect(() => {
    const handleClick = (event) => {
      if (event.code === "ArrowLeft") {
        // изменяем (-1) состояние, в котором хранится карта, которую сейчас показываем
        setCardToShow((prevCardId) => {
          return prevCardId > 0 ? prevCardId - 1 : 0;
        });
      }
      if (event.code === "ArrowRight") {
        setCardToShow((prevCardId) => {
          return prevCardId < listLength - 1 ? prevCardId + 1 : listLength - 1;
        });
      }
    };
    // подключаем прослушивание документа при монтировании компонента
    document.body.addEventListener("keydown", handleClick);

    // при размонтировании прослушка документа снимается
    return () => {
      document.body.removeEventListener("keydown", handleClick);
    };
  });
  return (
    <>
      {!listLength ? (
        <NothingFound
          title="Sorry, looks like you have no cards to flip"
          picture={picNoData}
        ></NothingFound>
      ) : (
        <>
          <Alert severity="success">
            <AlertTitle>Wow!</AlertTitle>
            You've learned <strong>{learnedWordsNumber}</strong> words!
          </Alert>

          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              columnGap: 3,
              padding: { xs: 1, sm: 4 },
              display: { xs: "none", sm: "flex" },
            }}
          >
            <IconButton
              aria-label="back"
              sx={{ visibility: cardToShow > 0 ? "visible" : "hidden" }}
              onClick={() => setCardToShow((prevCardId) => prevCardId - 1)}
            >
              <ArrowBack />
            </IconButton>

            <Box
              sx={{
                width: { xs: 10 / 10, sm: 1 / 2, md: 1 / 3, lg: 1 / 5 },
              }}
            >
              <WordCardView
                wordCard={listOfWords[cardToShow]}
                showTranslationFlag={showTranslationList.includes(
                  listOfWords[cardToShow].id
                )}
                onShowHideTranslation={handleShowHideTranslation}
                key={listOfWords[cardToShow].id}
              />
            </Box>

            <IconButton
              aria-label="forward"
              sx={{
                visibility: cardToShow < listLength - 1 ? "visible" : "hidden",
              }}
              onClick={() => setCardToShow((prevCardId) => prevCardId + 1)}
            >
              <ArrowForward />
            </IconButton>
          </Box>
          {/* для маленьких экранов - пролистывание смахиванием */}
          <Box
            sx={{
              scrollSnapType: "x mandatory",
              webkitOwerflowScrolling: "touch",
              overflowX: "scroll",
              display: { xs: "flex", sm: "none" },
            }}
          >
            {listOfWords.map((wCard, index) => (
              <Box
                sx={{
                  scrollSnapAlign: "start",
                  minWidth: "99%",
                  height: "99%",
                  bgcolor: "background.paper",
                  border: "1px solid gray",
                  borderRadius: 3,
                  boxShadow: 20,
                }}
                key={wCard.id}
              >
                <WordCardView
                  wordCard={wCard}
                  key={wCard.id}
                  showTranslationFlag={showTranslationList.includes(wCard.id)}
                  onShowHideTranslation={handleShowHideTranslation}
                  disableAutoFocus={true}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
