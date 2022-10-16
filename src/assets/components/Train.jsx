import { useState } from "react";
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
