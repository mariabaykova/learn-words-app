import axios from "axios";

class getServices {
  static async getListOfWords() {
    const result = {};
    try {
      const response = await axios.get(
        `http://itgirlschool.justmakeit.ru/api/words/`
      );
      // console.log("getListOfWords just fetched");
      result.data = response.data;
    } catch (err) {
      result.error = err.message;
    }
    return result;
  }
}

export default getServices;
