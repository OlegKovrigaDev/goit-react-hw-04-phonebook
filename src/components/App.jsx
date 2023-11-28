import React, { Component } from 'react';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import { addContact, deleteContact, filterChange } from 'functions';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    const checkContactName = name => {
      if (contacts.some(contact => contact.name === name)) {
        alert(`${name} is already in contacts.`);
        return;
      }
    };
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
          addContact={contact => addContact(contact, this.setState.bind(this))}
        />
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          onFilterChange={e => filterChange(e, this.setState.bind(this))}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={contactId =>
            deleteContact(contactId, this.setState.bind(this))
          }
        />
      </div>
    );
  }
}
