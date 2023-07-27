import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import styles from './Home.module.css';
import write_icon from '../assets/write_icon.svg';
//import CardComponent from '../components/CardComponent';

const HomePage = () => {

  return (
    <>
    <HeaderComponent />
    <div className={styles.home}>
      <img src={write_icon} className='image1' alt='icon' />
      <h1>Comece agora! Escreva uma nova nota de texto.</h1>
      <button>Escrever nota</button>
   {/*<div className={styles.conteiner}>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>*/}
    </div>
    <FooterComponent />
    </>
  );
};

export default HomePage;