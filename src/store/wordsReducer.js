const defaultState = {
  listOfWords: [],
};

const ADD_WORD = "ADD_WORD";
const ADD_WORDS_FROM_DB = "ADD_WORDS_FROM_DB";
const REMOVE_WORD = "REMOVE_WORD";

export const wordsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_WORDS_FROM_DB:
      return {
        ...state,
        listOfWords: [...state.listOfWords, ...action.payload],
      };
    case ADD_WORD:
      return { ...state, listOfWords: [...state.listOfWords, action.payload] };
    case REMOVE_WORD:
      return {
        ...state,
        listOfWords: state.listOfWords.filter(
          (word) => word.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// функции для создания экшенов
export const addWordAction = (payload) => ({ type: ADD_WORD, payload });
export const addWordsFromDBAction = (payload) => ({
  type: ADD_WORDS_FROM_DB,
  payload,
});
export const removeWordAction = (payload) => ({
  type: REMOVE_WORD,
  payload,
});
