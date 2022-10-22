// для формы редактирования слова - параметры для настройки полей ввода и их проверки
export const editableFields = {
  id: {
    id: "id",
    regexp: "^[0-9]*$",
    regexpMsg: "Id should be a number",
  },
  english: {
    label: "English",
    id: "english",
    regexp: "^[a-zA-Z][a-zA-Z- ]*[a-zA-Z]$",
    regexpMsg: "Use just english words, spaces and hyphen",
  },
  transcription: {
    label: "Transcription",
    id: "transcription",
    regexp: "^[^0-9]*$",
    regexpMsg: "Doesn't look like transcription",
  },
  russian: {
    label: "Russian",
    id: "russian",
    regexp: "^[а-яА-Я][а-яА-Я- ]*[а-яА-Я]$",
    regexpMsg: "Use just russian words, spaces and hyphen",
  },
  tags: {
    label: "Tags",
    id: "tags",
    regexp: "^[a-zA-Z][a-zA-Z- ]*[a-zA-Z]$",
    regexpMsg: "Use just english words, spaces and hyphen",
  },
};

export const emptyFieldMsg = "Field cannot be empty";
