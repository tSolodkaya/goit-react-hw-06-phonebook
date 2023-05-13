import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

export const contactSlice = createSlice({
  name: 'phonebook',
  initialState: { contacts: [], filter: '' },
  reducers: {
    addContact(state, action) {
      const isContactInBook = state.contacts.some(
        contact =>
          contact.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (isContactInBook) {
        return Notiflix.Notify.failure(
          `${action.payload.name} is already in contacts`
        );
      }
      const contactId = nanoid();
      const contact = {
        name: action.payload.name,
        number: action.payload.number,
        id: contactId,
      };

      state.contacts.push(contact);
    },

    filterContacts(state, action) {
      state.filter = action.payload;
    },

    deleteContact(state, action) {
      const contactToDelete = state.contacts.find(
        contact => contact.id === action.payload
      );
      const index = state.contacts.indexOf(contactToDelete);
      state.contacts.splice(index, 1);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

export const contactsReduser = persistReducer(
  persistConfig,
  contactSlice.reducer
);

export const { addContact, filterContacts, deleteContact } =
  contactSlice.actions;
