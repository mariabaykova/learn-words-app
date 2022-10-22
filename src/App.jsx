import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

// import { listOfWords } from "./assets/data/listOfWords.js";
import Utilities from "./assets/utilities/Utilities";

import pic404 from "./assets/pics/404page.jpeg";
import { lazy } from "react";
import getServices from "./Api/getServices";

const HeaderAppBar = lazy(() => import("./assets/components/HeaderAppBar"));
const ListOfWords = lazy(() => import("./assets/components/ListOfWords"));
const FlippingCards = lazy(() => import("./assets/components/FlippingCards"));
const WordCardAdd = lazy(() => import("./assets/components/WordCardAdd"));
const NothingFound = lazy(() => import("./assets/components/NothingFound"));
const Train = lazy(() => import("./assets/components/Train"));

// структура для описания пунктов меню. Если появится новый, вносим заголовок для меню и роут
// перенести в Settings?
const pages = [
  { menuTitle: "Home", route: "home" },
  { menuTitle: "Flip", route: "flip" },
  // { menuTitle: "Train", route: "train" },
];
function App() {
  // console.log("App started");
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

  async function getListOfWords() {
    const getList = await getServices.getListOfWords();
    if (getList.error) {
      // console.log("error " + getList.error);
      setError(getList.error);
      setListOfWords([]);
    } else if (getList.data) {
      setListOfWords(getList.data);
      setError(null);
    }
  }

  React.useEffect(() => {
    getListOfWords();
    setLoading(false);
  }, []);

  // // храним список удаленных в этой сессии карточек в состоянии этого компонента
  const [deletedCardsList, setCardAvailability] = React.useState([]);

  // // какие карточки нужно показать
  const cardsToShow = Utilities.DiffOfArrays(listOfWords, deletedCardsList);
  return (
    <BrowserRouter>
      <div>
        <HeaderAppBar pages={pages} />
        {loading && (
          <div>
            <CircularProgress color="inherit" />
          </div>
        )}
        {error && (
          <div>{`There is a problem while fetching data - ${error}`}</div>
        )}
        {cardsToShow && !loading && (
          <React.Suspense
            fallback={
              <div>
                <CircularProgress color="success" />
              </div>
            }
          >
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
              <Route path="/addcard" element={<WordCardAdd />} />
              <Route path="/train" element={<Train />} />
              <Route
                path="*"
                element={
                  <NothingFound
                    title="This page doesn't exist"
                    picture={pic404}
                  />
                }
              />
            </Routes>
          </React.Suspense>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
