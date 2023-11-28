export const addContact = (contact, setState) => {
  setState(prevState => ({
    contacts: [...prevState.contacts, contact],
  }));
};

export const filterChange = (e, setState) => {
  setState({ filter: e.target.value });
};

export const deleteContact = (contactId, setState) => {
  setState(prevState => ({
    contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  }));
};
