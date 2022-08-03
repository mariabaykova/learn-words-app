import * as React from "react";
import "./App.css";

import HeaderAppBar from "./assets/components/HeaderAppBar";
import ListOfWords from "./assets/components/ListOfWords";
import FlippingCards from "./assets/components/FlippingCards";

import { listOfWords } from "./assets/data/listOfWords.js";

function App() {
  // будем хранить во внутреннем состоянии этого компонента информацию о том, какой пункт меню был выбран в HeaderAppBar, в зависимости от этого мы будем показывать другие компоненты (список слов, просмотр слов etc). Информация о выбранном пункте будет поднята из HeaderAppBar.
  const [menuItemSelected, setMenuItem] = React.useState("Home");
  function handleMenuClick(menuItem) {
    // console.log("menuItem  " + menuItem);
    setMenuItem(menuItem);
    // console.log("menuItemSelected  " + menuItemSelected);
  }
  // console.log("menuItemSelected  " + menuItemSelected);
  return (
    <div className="wrapper">
      <HeaderAppBar onMenuClick={handleMenuClick} />
      {menuItemSelected === "Home" && <ListOfWords listOfWords={listOfWords} />}
      {menuItemSelected === "Flip" && (
        <FlippingCards listOfWords={listOfWords} />
      )}
    </div>
  );
}

export default App;
