import * as React from "react";
import { useState } from "react";

import getServices from "../../Api/getServices";
import postServices from "../../Api/postServices";
// страница для тестов, будет удалено
const Train = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  // console.log("firstName 👉️", firstName);
  // console.log("lastName 👉️", lastName);

  // const handleSubmit = (event) => {
  //   console.log("handleSubmit ran");
  //   event.preventDefault(); // 👈️ prevent page refresh

  //   // 👇️ access input values here
  //   console.log("firstName 👉️", firstName);
  //   console.log("lastName 👉️", lastName);

  // 👇️ clear all input values in the form
  //   setFirstName("");
  //   setLastName("");
  // };
  async function getWordCard() {
    const getList = await getServices.getWordCard(12187);
    console.log("getWordCard just started");
    console.log(getList);
  }

  // React.useEffect(() => {
  //   getWordCard();
  // }, []);

  async function delWordCard(cardId) {
    const delList = await postServices.delWordCard(cardId);
    console.log("delWordCard just started");
    console.log(delList); // delList.data === true - ok, delList.error == "Network Error", если нет error, но есть data <> true, то нечего удалять
  }

  // React.useEffect(() => {
  //   delWordCard(12188);
  // }, []);

  async function addWordCard(wCard) {
    const addList = await postServices.addWordCard(wCard);
    console.log("addWordCard just started");
    console.log("addList");
    console.log(addList); // addList.error, addList.data
  }

  // React.useEffect(() => {
  //   addWordCard({
  //     english: "Russia",
  //     transcription: "[rasha]",
  //     russian: "Россия",
  //     tags: "countries",
  //     tags_json: '["countries"]',
  //   });
  // }, []);

  async function updWordCard(wCard) {
    const updList = await postServices.updWordCard(wCard);
    console.log("updWordCard just started");
    console.log("updList");
    console.log(updList); // addList.error, addList.data
  }

  // React.useEffect(() => {
  //   updWordCard({
  //     id: "12187",
  //     english: "thirty three",
  //     transcription: "[therti thri]",
  //     russian: "тридцать три",
  //     tags: "numbers",
  //     tags_json: '["numbers"]',
  //   });
  // }, []);

  return (
    <div>
      <h1>This page is for tests. Will be removed.</h1>
      {/* <form onSubmit={handleSubmit}>
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
  </form> */}
    </div>
  );
};

export default Train;
