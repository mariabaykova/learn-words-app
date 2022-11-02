// почистить поля ввода от лишних символов
// пока придумала удалять только лишние пробелы
// будет использоваться при добавлении слова
export default class Beautify {
  static deleteOddSymbols(str) {
    return str.replace(/ +/g, " ").replace(/^ +/, "").replace(/ +$/, "");
  }
}
