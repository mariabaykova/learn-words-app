import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import wordsContext from "./assets/components/Context";

import CircularProgress from "@mui/material/CircularProgress";

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
  // const { listOfWords, assignListOfWords } = React.useContext(WordsContext);
  // const { listOfWordsContext } = React.useContext(WordsContext);

  const [listOfWords, setListOfWords] = React.useState(wordsContext);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  async function getListOfWords() {
    const getList = await getServices.getListOfWords();
    if (getList.error) {
      setError(getList.error);
      setListOfWords([]);
      // assignListOfWords([]);
    } else if (getList.data) {
      // assignListOfWords(getList.data);
      setListOfWords(getList.data);
      setError(null);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    console.log("запрос на сервер списка слов");
    getListOfWords();
  }, []);

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
        {listOfWords && !loading && (
          <React.Suspense
            fallback={
              <div>
                <CircularProgress color="success" />
              </div>
            }
          >
            <wordsContext.Provider value={listOfWords}>
              <Routes>
                <Route
                  path="/home"
                  element={<ListOfWords listOfWords={listOfWords} />}
                />
                <Route
                  path="/"
                  element={<ListOfWords listOfWords={listOfWords} />}
                />
                <Route
                  path="/flip"
                  element={<FlippingCards listOfWords={listOfWords} />}
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
            </wordsContext.Provider>
          </React.Suspense>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
