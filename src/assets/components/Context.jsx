import React, { useState } from "react";

const WordsContext = React.createContext();

function WordsContextProvider(props) {
  const [listOfWords, setListOfWords] = useState([]);

  function assignListOfWords(newList) {
    setListOfWords([...newList]);
  }

  return (
    <WordsContext.Provider value={{ listOfWords, assignListOfWords }}>
      {props.children}
    </WordsContext.Provider>
  );
}
export { WordsContextProvider, WordsContext };
