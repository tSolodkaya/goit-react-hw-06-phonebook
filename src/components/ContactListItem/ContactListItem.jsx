import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';

import css from './ContactListItem.module.css';

const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <li key={id} className={css.listItem}>
      <p className={css.contactName}>{name}:</p>
      <p>{number}</p>

      <button
        className={css.deleteBtn}
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func,
};

export default ContactListItem;
