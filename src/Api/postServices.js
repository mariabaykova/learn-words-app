import axios from "axios";

class postServices {
  static async delWordCard(cardId) {
    const result = {};
    try {
      const response = await axios.post(
        `http://itgirlschool.justmakeit.ru/api/words/${cardId}/delete`
      );
      result.data = response.data;
    } catch (err) {
      result.error = err.message;
    }
    return result;
  }
  static async addWordCard(wCard) {
    const result = {};
    try {
      const response = await axios.post(
        "https://cors-everywhere.herokuapp.com/http://itgirlschool1.justmakeit.ru/api/words/add",
        wCard
      );
      result.data = response.data;
    } catch (err) {
      result.error = err.message;
    }

    return result;
  }

  static async updWordCard(wCard) {
    const result = {};
    try {
      const response = await axios.post(
        `http://itgirlschool.justmakeit.ru/api/words/${wCard.id}/update`,
        wCard
      );
      result.data = response.data;
    } catch (err) {
      result.error = err.message;
    }

    return result;
  }
}

export default postServices;
