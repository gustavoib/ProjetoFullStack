import { useContext, useState } from 'react';
import styles from './Header.module.css';
import perfil from '/perfil.svg';
import logout_icon from '../assets/logout.svg';
import { AuthContext } from '../contexts/auth';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import RegisterPage from '../pages/RegisterPage';

const HeaderComponent = () => {
  const { authenticated, logout, register } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user')!);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para lidar com o logout
  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
  };

  // Função para lidar com o registro
  const handleRegister = () => {
    register();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={styles.header}>
      <a href='/home'><h1>DoNotes</h1></a>
      {authenticated ? (
        <>
          {/* Elementos a serem mostrados quando o usuário está autenticado */}
          <a href="/list-notes" className={styles.link} onClick={handleRegister}>Minhas notes</a>
          <img src={perfil} className={styles.perfil} alt="Avatar" />
          <p>{String(user.name)}</p>
          <img src={logout_icon} className={styles.logout} alt="Logout" />
          <a href="#contact" className={styles.link} onClick={handleLogout}>Logout</a>
        </>
      ) : (
        <>
          {/* Elementos a serem mostrados quando o usuário não está autenticado */}
          <a href="#about" className={styles.link} >Sobre o desenvolvedor</a>
          <a href="#contact" className={styles.link} >Contatos</a>
          <a href="https://github.com/gustavoib/ProjetoFullStack/tree/front-end" className={styles.link}>Repositório GitHub</a>
          <img src={perfil} className={styles.perfil} alt="Avatar" />
          <a href="#register" className={styles.link} onClick={openModal}>Cadastre-se</a>
        </>
      )}

      {/* Modal para a página de registro */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Página de Registro"
        shouldCloseOnEsc={true}
        className={styles.modal}
      >
        <button className={styles.close} onClick={closeModal}>X</button>
        <RegisterPage/>
      </Modal>
    </header>
  );
};

export default HeaderComponent;
