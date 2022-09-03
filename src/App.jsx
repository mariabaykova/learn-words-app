import * as React from "react";
import "./App.css";

import HeaderAppBar from "./assets/components/HeaderAppBar";
import ListOfWords from "./assets/components/ListOfWords";
import FlippingCards from "./assets/components/FlippingCards";

import { listOfWords } from "./assets/data/listOfWords.js";
import Utilities from "./assets/utilities/Utilities";
const pages = ["Home", "Flip"];

function App() {
  // будем хранить во внутреннем состоянии этого компонента информацию о том, какой пункт меню был выбран в HeaderAppBar, в зависимости от этого мы будем показывать другие компоненты (список слов, просмотр слов etc). Информация о выбранном пункте будет поднята из HeaderAppBar.
  const [menuItemSelected, setMenuItem] = React.useState("Home");
  function handleMenuClick(menuItem) {
    setMenuItem(menuItem);
  }
  // храним список удаленных в этой сессии карточек в состоянии этого компонента
  const [deletedCardsList, setCardAvailability] = React.useState([]);
  function addToDelList(cardId) {
    setCardAvailability((prevState) => {
      return Utilities.PushToArray(prevState, cardId);
    });
  }

  return (
    <div className="wrapper">
      <HeaderAppBar onMenuClick={handleMenuClick} pages={pages} />
      {menuItemSelected === "Home" && (
        <ListOfWords
          listOfWords={Utilities.DiffOfArrays(listOfWords, deletedCardsList)}
          onLiftDelCardId={addToDelList}
        />
      )}
      {menuItemSelected === "Flip" && (
        <FlippingCards
          listOfWords={Utilities.DiffOfArrays(listOfWords, deletedCardsList)}
        />
      )}
    </div>
  );
}

export default App;
