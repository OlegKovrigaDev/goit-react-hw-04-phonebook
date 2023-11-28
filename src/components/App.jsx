import React, { useState, useEffect, useCallback } from 'react';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = useCallback(contact => {
    setContacts(prevContacts => [...prevContacts, contact]);
  }, []);

  const filterChange = useCallback(e => {
    setFilter(e.target.value);
  }, []);

  const deleteContact = useCallback(contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  }, []);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const checkContactName = useCallback(
    name => {
      if (contacts.some(contact => contact.name === name)) {
        alert(`${name} is already in contacts.`);
        return;
      }
    },
    [contacts]
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm
        checkContactName={checkContactName}
        addContact={addContact}
      />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={filterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
