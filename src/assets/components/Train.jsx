import * as React from "react";
import { useState } from "react";

import getServices from "../../Api/getServices";
import postServices from "../../Api/postServices";
// страница для тестов, будет удалено
const Train = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  console.log("firstName 👉️", firstName);
  console.log("lastName 👉️", lastName);

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log("firstName 👉️", firstName);
    console.log("lastName 👉️", lastName);

    // 👇️ clear all input values in the form
    setFirstName("");
    setLastName("");
  };
  /*
  React.useEffect(() => {
    async function getWordCard() {
      const getList = await getServices.getWordCard(12127);
      console.log("getWordCard just started");
      if (getList.error) {
        console.log("getWordCard error " + getList.error);
        // setError(getList.error);
        // setListOfWords([]);
      } else if (getList.data) {
        // setListOfWords(getList.data);
        // setError(null);
        console.log("getList.data received");
        console.log(getList.data);
      }
      // setLoading(false);
    }
    getWordCard();
  }, []);
  */
  /*
  React.useEffect(() => {
    async function delWordCard() {
      const delList = await postServices.delWordCard(12127);
      console.log("delWordCard just started");
      if (delList.error) {
        console.log("delWordCard error " + delList.error); //"Request failed with status code 404"
        // setError(getList.error);
        // setListOfWords([]);
      } else if (delList.data === true) {
        // setListOfWords(getList.data);
        // setError(null);
        console.log("delList.data received");
        console.log(delList.data); // true if successfull
      }
      // setLoading(false);
    }
    delWordCard();
  }, []);

  */

  React.useEffect(() => {
    async function addWordCard() {
      const addList = await postServices.addWordCard();
      console.log("addWordCard just started");
      if (addList.error) {
        console.log("addWordCard error " + addList.error); //Network Error
        // setError(getList.error);
        // setListOfWords([]);
      } else if (addList.data === true) {
        // setListOfWords(getList.data);
        // setError(null);
        console.log("addList.data received");
        console.log(addList.data); // true if successfull
      }
      // setLoading(false);
    }
    addWordCard();
  }, []);

  return (
    <div>
      <h1>This page is for tests. Will be removed.</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="first_name"
          name="first_name"
          type="text"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        />
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default Train;
