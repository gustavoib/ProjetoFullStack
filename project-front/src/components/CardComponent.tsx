import styles from './Card.module.css';

const CardComponent = () => {

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardbody}>
          <h5 className={styles.cardtitle}>Título da nota</h5>
          <p className={styles.cardtext}>Texto da nota</p>
        </div>
      </div>
    </>
  );
};

export default CardComponent;