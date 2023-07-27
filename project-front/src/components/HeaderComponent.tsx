import { useContext } from 'react';
import styles from './Header.module.css';
import perfil from '/perfil.svg';
import logout_icon from '../assets/logout.svg'; ;
import { AuthContext } from '../contexts/auth';

const HeaderComponent = () => {
  const { authenticated, logout } = useContext(AuthContext);
  
  const user = JSON.parse(localStorage.getItem('user')!);

  // Função para lidar com o logout
  const handleLogout = () => {
    window.location.reload();
    logout();   
  }

  return (
    <header className={styles.header}>
      <h1>DoNotes</h1>
      {authenticated ? (
        <>
          {/* Elementos a serem mostrados quando o usuário está autenticado */}
          <a href="#about">Minhas notes</a>
          <img src={perfil} className={styles.perfil} alt="Avatar" />
          <p>{String(user.name)}</p>
          <img src={logout_icon} className={styles.logout} alt="Logout" />
          <a href="#contact" className="logout" onClick={handleLogout}>Logout</a>
        </>
      ) : (
        <>
          {/* Elementos a serem mostrados quando o usuário não está autenticado */}
          <a href="#about">Sobre o desenvolvedor</a>
          <a href="#contact">Contatos</a>
          <a href="https://github.com/gustavoib/ProjetoFullStack/tree/front-end">Repositório GitHub</a>
          <img src={perfil} className={styles.perfil} alt="Avatar" />
          <a href="#contact" className="cadastro">Cadastre-se</a>
        </>
      )}
    </header>
  );
};

export default HeaderComponent;
