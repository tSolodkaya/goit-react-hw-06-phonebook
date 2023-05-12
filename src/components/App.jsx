import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const isContactInBook = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactInBook) {
      return Notiflix.Notify.failure(`${name} is already in contacts`);
    }

    const contactId = nanoid();

    const contact = {
      name,
      number,
      id: contactId,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const handleFilterContacts = event => {
    const inputValue = event.target.value;
    setFilter(inputValue);
  };

  const handelDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const normilizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(normilizedFilter);
  });

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <Filter nameForFind={filter} onFilter={handleFilterContacts} />
      <h2>Contact List </h2>
      <ContactList contacts={visibleContacts} deleteFn={handelDeleteContact} />
    </div>
  );
};
