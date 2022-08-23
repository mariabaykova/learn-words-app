export default class Utilities {
  static UpdateArray(arr, elem) {
    let ind = arr.indexOf(elem);

    if (ind === -1) {
      return [...arr, elem];
    } else {
      return arr.filter((item) => item !== elem);
    }
  }
  static PushToArray(arr, elem) {
    let ind = arr.indexOf(elem);

    if (ind === -1) {
      return [...arr, elem];
    } else {
      return [...arr];
    }
  }
  static DiffOfArrays(arrA, arrB) {
    return arrA.filter((item) => !arrB.includes(item.id));
  }
}
