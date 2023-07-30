import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import styles from './ViewNotes.module.css';
//import CardComponent from '../components/CardComponent';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
//import CardComponent from '../components/CardComponentView';
import { getNotes } from '../services/service';
import CardComponentView from '../components/CardComponentView';
import { api } from '../services/service';



const ViewNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
        const token = localStorage.getItem('token');
        const storagedUser = localStorage.getItem('user');
        const user = JSON.parse(String(storagedUser));
        const id = user.idUser;

        api.defaults.headers.Authorization = `Bearer ${token}`;

        const response = await getNotes(id);
        setNotes(response.data);
        }
    )();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <HeaderComponent />
      <div className={styles.view}>
        <div className={styles.conteiner}>
          {notes.map((nota:any) => (
            <CardComponentView key={nota.idNote} content={nota.content} title={nota.title}/>
          ))}
        </div>
      </div>
      <FooterComponent />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Página de Registro"
        shouldCloseOnEsc={true}
        className={styles.modal}
      >
        <button className={styles.close} onClick={closeModal}>X</button>
        {/*<CardComponent/>*/}
      </Modal>
    </>
  );
};

export default ViewNotes;