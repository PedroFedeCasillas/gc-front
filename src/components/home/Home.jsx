import { useEffect, useState } from "react";
import axios from "axios";
import Contact from "../contact/Contact";
import styles from "../home/home.module.css";

const API_URL = "http://localhost:3001"

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/contact`);
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const [input, setInput] = useState({
    name: "",
    address: "",
    phone: "1234-5678",
    email: "ejemplo@gmail.com",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    console.log(input);
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`${API_URL}/contact`, input);
      setContacts(data);
      setInput({
        name: "",
        address: "",
        phone: "1234-5678",
        email: "ejemplo@gmail.com",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <h2 className={styles.title1}>Create Contact</h2>

        <form onSubmit={handleSubmit} className={styles.form1}>
          <label className={styles.label1}>Name: </label>
          <input
            className={styles.input1}
            type="text"
            name="name"
            value={input.name}
            placeholder="Enter name..."
            onChange={handleChange}
          />
          <label className={styles.label1}>Address: </label>
          <input
            className={styles.input1}
            type="text"
            name="address"
            value={input.address}
            placeholder="Enter address..."
            onChange={handleChange}
          />
          <button className={styles.btnForm} onSubmit={handleSubmit}>Create Contact</button>
        </form>

      </div>
      <div className={styles.containerContact}>
        <h2 className={styles.title2}>Contacts</h2>
        {contacts?.map((contact, index) => (
          <Contact key={index} contact={contact} setContacts={setContacts} />
        ))}
      </div>
    </div>
  );
}
