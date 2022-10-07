// для формы редактирования слова - параметры для настройки полей ввода и их проверки
export const editableFields = {
  englishWord: {
    label: "English",
    variant: "filled",
    id: "englishWord",
    size: "small",
    regexp: "^[a-zA-Z][a-zA-Z- ]*[a-zA-Z]$",
    regexpMsg: "Use just english words, spaces and hyphen",
  },
  transcription: {
    label: "Transcription",
    variant: "filled",
    id: "transcription",
    size: "small",
    regexp: "^[^0-9]*$",
    regexpMsg: "Doesn't look like transcription",
  },
  russianWord: {
    label: "Russian",
    variant: "filled",
    id: "russianWord",
    size: "small",
    regexp: "^[а-яА-Я][а-яА-Я- ]*[а-яА-Я]$",
    regexpMsg: "Use just russian words, spaces and hyphen",
  },
};

export const emptyFieldMsg = "Field cannot be empty";
