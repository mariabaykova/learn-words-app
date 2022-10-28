export default class Utilities {
  static UpdateArrayElem(arr = [], elem1, elem2) {
    // заменить элемент elem1 массива arr на elem2
    let ind = arr.indexOf(elem1);
    arr[ind] = ind > -1 ? elem2 : elem1;
    return [...arr];
  }
  static DelElemFromArray(arr = [], elem) {
    return [arr.filter((item) => item !== elem)];
  }

  static UpdateArray(arr, elem) {
    // добавить элемент в массив, если его там нет. Удалить, если он там есть.
    let ind = arr.indexOf(elem);

    if (ind === -1) {
      return [...arr, elem];
    } else {
      return arr.filter((item) => item !== elem);
    }
  }
  static PushToArray(arr, elem) {
    // добавить элемент в массив только если его там нет
    let ind = arr.indexOf(elem);

    if (ind === -1) {
      return [...arr, elem];
    } else {
      return [...arr];
    }
  }
  static DiffOfArrays(arrA = [], arrB = []) {
    return arrA.filter((item) => !arrB.includes(item.id));
  }
}
