import * as React from "react";
import Box from "@mui/material/Box";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import WordCardView from "./WordCardView.jsx";
import NothingFound from "./NothingFound.jsx";

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

  function handleShowHideTranslation(cardId) {
    // console.log("handleShowHideTranslation поднято " + cardId);
    // console.log("showTranslationList до записи " + showTranslationList);
    console.log("handleShowHideTranslation cardId: " + cardId);
    setShowTranslation(
      // здесь prevState - это предыдущее состояние списка
      (prevState) => {
        let ind = showTranslationList.indexOf(cardId);
        console.log("handleShowHideTranslation ind: " + ind);
        if (ind === -1) {
          return [...prevState, cardId];
        } else {
          return prevState.filter((item) => item !== cardId);
        }
      }
    );
  }

  return (
    <>
      {!listLength ? (
        <NothingFound title="Sorry, looks like you have no cards to flip"></NothingFound>
      ) : (
        <>
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
                english={listOfWords[cardToShow].english}
                russian={listOfWords[cardToShow].russian}
                transcription={listOfWords[cardToShow].transcription}
                showTransl={showTranslationList.includes(
                  listOfWords[cardToShow].id
                )}
                // showTransl={false}
                id={listOfWords[cardToShow].id}
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
                  english={wCard.english}
                  transcription={wCard.transcription}
                  russian={wCard.russian}
                  tags={wCard.tags}
                  id={wCard.id}
                  key={wCard.id}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
