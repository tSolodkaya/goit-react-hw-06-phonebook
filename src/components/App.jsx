import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { useSelector } from 'react-redux';
import css from './App.module.css';

export const App = () => {
  const stateContacts = useSelector(state => state.phonebook.contacts);
  const stateFilter = useSelector(state => state.phonebook.filter);

  const normilizedFilter = stateFilter.toLowerCase();
  const visibleContacts = stateContacts.filter(contact => {
    return contact.name.toLowerCase().includes(normilizedFilter);
  });

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      {stateContacts.length > 0 && <Filter nameForFind={stateFilter} />}

      <h2>Contact List </h2>
      {visibleContacts.length > 0 ? (
        <ContactList contacts={visibleContacts} />
      ) : (
        <div className={css.nocontact}>No contacts to show</div>
      )}
    </div>
  );
};
