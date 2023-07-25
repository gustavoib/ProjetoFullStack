import React from 'react';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import { AuthContext } from '../contexts/auth';
import styles from './Home.module.css';

const HomePage = () => {
  const {logout} = React.useContext(AuthContext);

  const hadleLogout = () => {
    logout();
  }

  return (
    <>
    <div className={styles.home}>
      <HeaderComponent />
      <button onClick={hadleLogout}>Sair</button>
      <h1>Home</h1>
      <FooterComponent />
    </div>
    </>
  );
};

export default HomePage;