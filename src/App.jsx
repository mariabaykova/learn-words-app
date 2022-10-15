import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import HeaderAppBar from "./assets/components/HeaderAppBar";
import ListOfWords from "./assets/components/ListOfWords";
import FlippingCards from "./assets/components/FlippingCards";
// import Train from "./assets/components/Train";
import ShowMsgPage from "./assets/components/NothingFound";

// import { listOfWords } from "./assets/data/listOfWords.js";
import Utilities from "./assets/utilities/Utilities";

import pic404 from "./404page.jpeg";

// структура для описания пунктов меню. Если появится новый, вносим заголовок для меню и роут
// перенести в Settings?
const pages = [
  { menuTitle: "Home", route: "home" },
  { menuTitle: "Flip", route: "flip" },
  // { menuTitle: "Train", route: "train" },
];

function App() {
  // добавление карты в список удаленных карт
  function addToDelList(cardId) {
    setCardAvailability((prevState) => {
      return Utilities.PushToArray(prevState, cardId);
    });
  }

  // загрузка списка слов
  const [listOfWords, setListOfWords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    fetch(`http://itgirlschool.justmakeit.ru/api/words/`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        if (response.ok) {
          console.log("fetch done, response code " + response.status);
        }

        return response.json();
      })
      .then((actualData) => {
        setListOfWords(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setListOfWords(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // // храним список удаленных в этой сессии карточек в состоянии этого компонента
  const [deletedCardsList, setCardAvailability] = React.useState([]);

  // // какие карточки нужно показать
  const cardsToShow = Utilities.DiffOfArrays(listOfWords, deletedCardsList);
  return (
    <BrowserRouter>
      <div>
        <HeaderAppBar pages={pages} />
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem while fetching data - ${error}`}</div>
        )}
        {cardsToShow && !loading && (
          <Routes>
            <Route
              path="/home"
              element={
                <ListOfWords
                  listOfWords={cardsToShow}
                  onLiftDelCardId={addToDelList}
                />
              }
            />
            <Route
              path="/"
              element={
                <ListOfWords
                  listOfWords={cardsToShow}
                  onLiftDelCardId={addToDelList}
                />
              }
            />
            <Route
              path="/flip"
              element={<FlippingCards listOfWords={cardsToShow} />}
            />
            {/* <Route path="/train" element={<Train />} /> */}
            <Route
              path="*"
              element={
                <ShowMsgPage title="This page doesn't exist" picture={pic404} />
              }
            />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
