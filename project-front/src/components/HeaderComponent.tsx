import React, { Component } from 'react';
import styles from './Header.module.css';

class headerComponent extends Component {
    render() {
        return (
            <header className={styles.header}>
                <h1>DoNotes</h1>
                <a href="#about">Sobre o desenvolvedor</a>
                <a href="#contact">Contatos</a>
                <a href="https://github.com/gustavoib/ProjetoFullStack/tree/front-end">Repositório GitHub</a>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"/>
                <a href="#contact" className="login">Cadastre-se</a>
            </header>
        );
    }
}

export default headerComponent;