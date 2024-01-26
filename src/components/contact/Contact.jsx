import axios from "axios";
import styles from "../contact/contact.module.css"
import {MdDeleteForever} from "react-icons/md"
import {FaHeart} from "react-icons/fa"

const API_URL = "http://localhost:3001"

export default function Contact({ contact, setContacts }) {
  const { id, name, address, phone, email, favorite } = contact;

  const handleFavorite = async (event) => {
    try {
      const updatedContact = {
        ...contact,
        favorite: !favorite,
      };

      const { data } = await axios.put(
        `${API_URL}/contact`,
        updatedContact
      );

      await setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event) => {
      try {
        const { data } = await axios.delete(
            `${API_URL}/contact/${id}`
          );
          await setContacts(data);
          alert('Contacto eliminado con éxito');
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar el contacto. Por favor, inténtelo de nuevo.');
    }
  }

  return (
    <div className={styles.contactContainer}>
      <h3 className={styles.titleh3}>Name: {name}</h3>
      <h4 className={styles.titleh4}>ID: {id}</h4>
      <h4 className={styles.titleh4}>Address: {address}</h4>
      <h4 className={styles.titleh4}>Phone: {phone}</h4>
      <h4 className={styles.titleh4}>Email: {email}</h4>
      {favorite ? (
        <button className={styles.btnFavorite} onClick={handleFavorite}>
        <FaHeart className={styles.btnFavoriteRed}/>
        </button>
      ) : (
        <button className={styles.btnFavorite} onClick={handleFavorite}>
        <FaHeart className={styles.btnFavoriteWhite}/>
        </button>
      )}
      <button className={styles.btndelete} onClick={handleDelete}>
        <MdDeleteForever className={styles.btndeleteIcon}/>
        </button>
      
    </div>
  );
}
