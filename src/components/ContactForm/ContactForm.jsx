import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';
import { addContact } from 'redux/contactSlice';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const stateContacts = useSelector(state => state.phonebook.contacts);

  const dispatch = useDispatch();

  const handleChangeInput = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    switch (inputName) {
      case 'name':
        setName(inputValue);
        break;
      case 'number':
        setNumber(inputValue);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const isContactInBook = stateContacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContactInBook) {
      return Notiflix.Notify.failure(`${name} is already in contacts`);
    }

    const contactId = nanoid();

    const contact = {
      name: name,
      number: number,
      id: contactId,
    };

    dispatch(addContact(contact));

    setName('');
    setNumber('');
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label className={css.formLabel}>
        Name
        <input
          className={css.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChangeInput}
        />
      </label>
      <label className={css.formLabel}>
        Phone number
        <input
          className={css.formInput}
          type="phone"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChangeInput}
        />
      </label>
      <button className={css.addButton} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
