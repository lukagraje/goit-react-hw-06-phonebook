import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./SearchFilter/Filter";
import { addContact, deleteContact } from "../../redux/slices/contactsSlice";
import { setFilter } from "../../redux/slices/filtersSlice";

export default function App() {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts && storedContacts.length > 0) {
      storedContacts.forEach((contact) => dispatch(addContact(contact)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const newContact = { name, number, id: nanoid() };
    const checkContact = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (checkContact) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleChange = (ev) => {
    dispatch(setFilter(ev.target.value));
  };

  const getFilteredContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChange} />
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={handleDeleteContact}
      />
    </div>
  );
}
