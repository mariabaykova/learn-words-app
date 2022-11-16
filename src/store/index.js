import { createStore, combineReducers } from "redux";
import { wordsReducer } from "./wordsReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// позволяет внутри сторонних функций использовать диспатч
// import thunk from "redux-thunk";

const rootReducer = combineReducers({
  listOfWords: wordsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
