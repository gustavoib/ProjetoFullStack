import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import styles from './Home.module.css';
import write_icon from '../assets/write_icon.svg';
import Modal from 'react-modal';
import { useState } from 'react';
import CardComponentWrite from '../components/CardComponenteWrite';



const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <HeaderComponent />
      <div className={styles.home}>
        <img src={write_icon} className='image1' alt='icon' />
        <h1>Comece agora! Escreva uma nova nota de texto.</h1>
        <button onClick={openModal}>Escrever nota</button>
      </div>
      <FooterComponent />
      {/* aplicação do Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Página de Registro"
        shouldCloseOnEsc={true}
        className={styles.modal}
      >
        <button className={styles.close} onClick={closeModal}>X</button>
        <CardComponentWrite/>
      </Modal>
    </>
  );
};

export default HomePage;