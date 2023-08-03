import styles from './CardView.module.css';
import { AuthContext } from '../contexts/auth';
import { useContext, useState} from 'react';
import CardComponentEdit from './CardComponentEdit';
import Modal from 'react-modal';

type CardComponentViewProps = {
  content: string;
  title: string;
  id: number;
};

const CardComponentView: React.FC<CardComponentViewProps> = ({ id, content, title }) => {
  const { deleteNote } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    window.location.reload();
    deleteNote(id);
  };

  return (
    <>
      <div className={styles.card}>
          <a href="/view" className={styles.see} />
          <a className={styles.edit} onClick={openModal}/>
          <a className={styles.del} onClick={handleDelete} />
          <h5 className={styles.cardtitle}>{title}</h5>
        <div className={styles.cardbody}>
          <p className={styles.cardtext}>{content}</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Página de Registro"
        shouldCloseOnEsc={true}
        className={styles.modal}
      >
        <button className={styles.close} onClick={closeModal}>X</button>
        <CardComponentEdit key={id} id={id} initial_title={title} initial_content={content}/>
      </Modal>
    </>
  );
};

export default CardComponentView;