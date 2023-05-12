import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, filterContacts, deleteContact } from 'redux/contactSlice';
import css from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const stateContacts = useSelector(state => state.phonebook.contacts);
  const stateFilter = useSelector(state => state.phonebook.filter);

  const normilizedFilter = stateFilter.toLowerCase();
  const visibleContacts = stateContacts.filter(contact => {
    return contact.name.toLowerCase().includes(normilizedFilter);
  });

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={(name, number) => dispatch(addContact(name, number))}
      />
      {stateContacts.length > 0 && (
        <Filter
          nameForFind={stateFilter}
          onFilter={event => dispatch(filterContacts(event.target.value))}
        />
      )}

      <h2>Contact List </h2>
      {visibleContacts.length > 0 ? (
        <ContactList
          contacts={visibleContacts}
          deleteFn={id => dispatch(deleteContact(id))}
        />
      ) : (
        <div>No contacts to show</div>
      )}
    </div>
  );
};
