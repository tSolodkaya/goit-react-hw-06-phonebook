import { createSlice } from '@reduxjs/toolkit';
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
      const con = state.contacts.find(contact => contact.id === action.payload);
      const index = state.contacts.indexOf(con);
      state.contacts.splice(index, 1);
    },
  },
});

export const { addContact, filterContacts, deleteContact } =
  contactSlice.actions;
