import axios from "axios";

class getServices {
  static async getListOfWords() {
    const result = {};
    try {
      const response = await axios.get(
        `http://itgirlschool.justmakeit.ru/api/words/`
      );
      result.data = response.data;
    } catch (err) {
      result.error = err.message;
    }
    return result;
  }
  static async getWordCard(cardId) {
    const result = {};
    try {
      const response = await axios.get(
        `http://itgirlschool.justmakeit.ru/api/words/${cardId}`
      );
      result.data = response.data;
    } catch (err) {
      result.error = err.message;
    }
    return result;
  }
}

export default getServices;
