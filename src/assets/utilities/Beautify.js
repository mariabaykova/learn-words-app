// почистить поля ввода от лишних символов
// пока придумала удалять только лишние пробелы
// пока не используется
export default class Beautify {
  static deleteOddSymbols(str) {
    return str.replace(/ +/g, " ").replace(/^ +/, "").replace(/ +$/, "");
  }
}
