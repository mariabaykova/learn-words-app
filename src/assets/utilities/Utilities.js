export default class Utilities {
  static UpdateArray(arr, elem) {
    let ind = arr.indexOf(elem);

    if (ind === -1) {
      return [...arr, elem];
    } else {
      return arr.filter((item) => item !== elem);
    }
  }
}
