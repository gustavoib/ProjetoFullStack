import styles from './CardView.module.css';
// import { useContext } from 'react';
// import { AuthContext } from '../contexts/auth';

type CardComponentViewProps = {
  content: string;
  title: string;
};

const CardComponentView: React.FC<CardComponentViewProps> = ({ content, title }) => {

  //const { listNotes } = useContext(AuthContext);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardbody}>
          <h5 className={styles.cardtitle}>{title}</h5>
          <p className={styles.cardtext}>{content}</p>
        </div>
      </div>
    </>
  );
};

export default CardComponentView;