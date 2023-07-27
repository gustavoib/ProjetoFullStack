import { useState, useContext } from 'react';
import styles from './Login.module.css';
import { ILogin } from '../interfaces/Login';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import { AuthContext } from '../contexts/auth';


const LoginPage = () => {

    const [access, setAccess] = useState<ILogin>({} as ILogin);

    const { login } = useContext(AuthContext);


    const hadleSubmit = (e: any) => {
        e.preventDefault();
        console.log("login", access);
        login(access.email, access.password);
        console.log("login", access.email, access.password);
    }

    return (
      <> 
        <HeaderComponent />
        <div className={styles.login}>
          <form className='login' onSubmit={hadleSubmit}>
            <h1 className='title'>Login</h1>
            <label htmlFor="email">E-mail</label>
            <input 
                type="text" 
                id="email" 
                placeholder="E-mail" 
                value={login.email} 
                onChange={(e) => setAccess({...access, email: e.target.value})} 
                required />
            <label htmlFor="password">Senha</label>
            <input 
                type="password"
                id="password" 
                placeholder="Senha" 
                value={login.password} 
                onChange={(e) => setAccess({...access, password: e.target.value})}
                required />
            <a href="#redefinir" id="remember">Esqueci minha senha</a>
            <button className="actions" type="submit">Entrar</button>
          </form>
        </div>
        <FooterComponent />
    </>
  );
};

export default LoginPage;
