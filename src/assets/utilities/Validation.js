import { editableFields } from "../conf/Settings";

export default class Validation {
  static isEmpty(str) {
    return Boolean(!str.length);
  }
  static isFormatCorrect(str, fieldType) {
    console.log("str, fieldType");
    console.log(str, fieldType);
    return !editableFields[fieldType]
      ? false
      : str.search(editableFields[fieldType].regexp) === -1
      ? false
      : true;
  }
  static isEmptyObj(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }
}
