import * as React from "react";
import { lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWordsFromDBAction } from "./store/wordsReducer";

import CircularProgress from "@mui/material/CircularProgress";
import HeaderAppBar from "./assets/components/HeaderAppBar";
import ListOfWords from "./assets/components/ListOfWords";
import FlippingCards from "./assets/components/FlippingCards";
import WordCardAdd from "./assets/components/WordCardAdd";
import Train from "./assets/components/Train";

import pic404 from "./assets/pics/404page.jpeg";
import getServices from "./Api/getServices";
import { pages } from "./assets/conf/Settings";
const NothingFound = lazy(() => import("./assets/components/NothingFound"));

function App() {
  // запрос текущего состояния списка слов из стейта
  const listOfWords = useSelector((state) => state.listOfWords);

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
