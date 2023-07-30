import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import styles from './Home.module.css';
import write_icon from '../assets/write_icon.svg';
//import CardComponent from '../components/CardComponent';
import Modal from 'react-modal';
import { useState } from 'react';
import CardComponentView from '../components/CardComponentView';



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
        {/*<div className={styles.conteiner}>
          <CardComponentView />
          <CardComponentView />
          <CardComponentView />
          <CardComponentView />
  </div>*/}
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
        <CardComponentView/>
      </Modal>
    </>
  );
};

export default HomePage;