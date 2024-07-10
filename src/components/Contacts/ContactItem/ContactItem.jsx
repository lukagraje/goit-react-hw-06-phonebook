import PropTypes from "prop-types";
import css from "./item.module.scss";

const ContactItem = ({ contact, deleteContact }) => {
  return (
    <li key={contact.id}>
      {contact.name}: {contact.number}
      <button className={css.button} onClick={() => deleteContact(contact.id) }>Delete contact</button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
