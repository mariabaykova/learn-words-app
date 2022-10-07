import { editableFields } from "../conf/Settings";

export default class Validation {
  static isEmpty(str) {
    return Boolean(!str.length);
  }
  static isFormatCorrect(str, fieldType) {
    return str.search(editableFields[fieldType].regexp) === -1 ? false : true;
  }
}
