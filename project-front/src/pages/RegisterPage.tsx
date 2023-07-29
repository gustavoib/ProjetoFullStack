import { useState, useContext } from 'react';
import styles from './Register.module.css';
import { AuthContext } from '../contexts/auth';
import { toast } from 'react-toastify';
import { IRegister } from '../interfaces/Register';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState<IRegister>({} as IRegister);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const success = await register(formData.name, formData.email, formData.password, formData.phone);

    console.log('success', success);

    if (success) {
      toast.success('Cadastro realizado com sucesso!');
    } else {
      toast.error('Erro ao cadastrar!');
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <div>
        <h1 className={styles.title}>Cadastro</h1>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Telefone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <button className={styles.button} type="submit">Cadastrar</button>
    </form>
  );
};

export default RegisterPage;
