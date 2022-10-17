import axios from "axios";

class postServices {
  static async delWordCard(cardId) {
    const result = {};
    try {
      const response = await axios.post(
        `http://itgirlschool.justmakeit.ru/api/words/` + cardId + `/delete`
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
        `http://itgirlschool.justmakeit.ru/api/words/add`,
        {
          english: "JavaScript",
          transcription: "[JavaScript]",
          russian: "Джава скрипт",
          tags: "IT",
          tags_json: '["IT"]',
        }
      );
      result.data = response.data;
    } catch (err) {
      result.error = err.message;
    }
    return result;
  }
}

export default postServices;
