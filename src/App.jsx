import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWordsFromDBAction } from "./store/wordsReducer";

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
  // запрос текущего состояния списка слов из стейта
  const listOfWords = useSelector((state) => state.listOfWords);

  console.log("listOfWords");
  console.log(listOfWords);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const dispatch = useDispatch();

  async function getListOfWords() {
    const getList = await getServices.getListOfWords();
    if (getList.error) {
      dispatch(addWordsFromDBAction([]));
      setError(getList.error);
      setLoading(false);
    } else if (getList.data) {
      dispatch(addWordsFromDBAction(getList.data));
      setError(null);
      setLoading(false);
    }
  }

  React.useEffect(() => {
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
            <Routes>
              <Route path="/home" element={<ListOfWords />} />
              <Route path="/" element={<ListOfWords />} />
              <Route path="/flip" element={<FlippingCards />} />
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
