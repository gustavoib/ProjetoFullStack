import styles from './CardView.module.css';
import { format } from 'date-fns';
import { AuthContext } from '../contexts/auth';
import { useContext, useState} from 'react';
import CardComponentEdit from './CardComponentEdit';
import Modal from 'react-modal';

type CardComponentViewProps = {
  content: string;
  title: string;
  id: number;
  date: string;
};

const CardComponentView: React.FC<CardComponentViewProps> = ({ id, content, title, date }) => {
  const { deleteNote } = useContext(AuthContext);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const openModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
  };

  const handleDelete = () => {
    const response = window.confirm('Tem certeza que deseja excluir esta nota?')
    if (response === true) {
      deleteNote(id);
      window.location.reload();
    }
  };

  return (
    <>
      <div className={styles.card}>        
        <a className={styles.edit} onClick={openModalEdit}/>
        <a className={styles.del} onClick={handleDelete} />
        <h5 className={styles.cardtitle}>{title}</h5>
        <div className={styles.cardbody}>
          <p className={styles.cardtext}>{content}</p>
        </div>
        <p className={styles.date}>nota criada no dia: {formatDate(date)}</p>
      </div>
      <Modal
        isOpen={isModalOpenEdit}
        onRequestClose={closeModalEdit}
        contentLabel="Página de Registro"
        shouldCloseOnEsc={true}
        className={styles.modal}
      >
        <button className={styles.close} onClick={closeModalEdit}>X</button>
        <CardComponentEdit key={id} id={id} initial_title={title} initial_content={content}/>
      </Modal>
    </>
  );
};

export default CardComponentView;