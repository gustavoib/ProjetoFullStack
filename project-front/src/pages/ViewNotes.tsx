import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import styles from './ViewNotes.module.css';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import CardComponentView from '../components/CardComponentView';
import { getNotes } from '../services/service';
import { api } from '../services/service';

const ViewNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const storagedUser = localStorage.getItem('user');
      const user = JSON.parse(String(storagedUser));
      const id = user.idUser;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      const response = await getNotes(id);
      setNotes(response.data);
    })();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <HeaderComponent />
      <div className={styles.view}>
        <div className={styles.conteiner}>
          {notes.length === 0 ? (
            <h3>Você ainda não possui notas.</h3>
          ) : (
            notes.map((nota) => (
              <CardComponentView key={nota.idNote} content={nota.content} title={nota.title} />
            ))
          )}
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
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
      </Modal>
    </>
  );
};

export default ViewNotes;
