import React, { useState } from 'react';
import { nanoid } from 'nanoid';

export const ContactForm = ({ checkContactName, addContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const { name, number } = formData;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    checkContactName(name);

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    addContact(newContact);

    setFormData({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Number:
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Add contact</button>
    </form>
  );
};
