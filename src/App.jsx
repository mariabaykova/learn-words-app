import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import HeaderAppBar from "./assets/components/HeaderAppBar";
import ListOfWords from "./assets/components/ListOfWords";
import FlippingCards from "./assets/components/FlippingCards";
// import Train from "./assets/components/Train";
import PageNotFound from "./assets/components/NothingFound";

import { listOfWords } from "./assets/data/listOfWords.js";
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
  // храним список удаленных в этой сессии карточек в состоянии этого компонента
  const [deletedCardsList, setCardAvailability] = React.useState([]);
  function addToDelList(cardId) {
    setCardAvailability((prevState) => {
      return Utilities.PushToArray(prevState, cardId);
    });
  }

  // какие карточки нужно показать
  const cardsToShow = Utilities.DiffOfArrays(listOfWords, deletedCardsList);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <HeaderAppBar pages={pages} />

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
              <PageNotFound title="This page doesn't exist" picture={pic404} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
