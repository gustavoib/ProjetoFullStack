import styles from './CardView.module.css';
import { AuthContext } from '../contexts/auth';
import { useContext } from 'react';

type CardComponentViewProps = {
  content: string;
  title: string;
  id: number;
};

const CardComponentView: React.FC<CardComponentViewProps> = ({id, content, title }) => {
  const { deleteNote } = useContext(AuthContext);

  const handleDelete = () => {
    window.location.reload();
    deleteNote(id);
  }

  return (
    <>
      <div className={styles.card}>
          <a href="/view" className={styles.see} />
          <a href="/edit" className={styles.edit} />
          <a className={styles.del} onClick={handleDelete}/>
          <h5 className={styles.cardtitle}>{title}</h5>
        <div className={styles.cardbody}>
          <p className={styles.cardtext}>{content}</p>
        </div>
      </div>
    </>
  );
};

export default CardComponentView;