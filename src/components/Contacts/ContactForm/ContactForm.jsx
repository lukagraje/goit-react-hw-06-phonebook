import React, { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes, { func } from "prop-types";
import styles from "./contacs.module.scss";

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [nameId] = useState(nanoid());
  const [numId] = useState(nanoid());

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "name":
        const isValidName = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\-; ]{0,30}$/.test(
          value,
        );
        if (!isValidName) {
          console.log("Invalid name format!");
          return;
        }
        setName(value);
        break;
      case "number":
        const isValidNumber = /^[0-9 +()-]{0,15}$/.test(value);
        if (!isValidNumber) {
          console.log("Invalid phone number format!");
          return;
        }
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(name, number);
    setName("");
    setNumber("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor={nameId}>Name</label>
      <input
        id={nameId}
        type="text"
        name="name"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />
      <label htmlFor={numId}>Phone number</label>
      <input
        id={numId}
        type="tel"
        name="number"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />
      <button type="submit">Add contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
