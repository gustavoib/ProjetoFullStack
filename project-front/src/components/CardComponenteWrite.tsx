import { useState } from 'react';
import styles from './CardWrite.module.css';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { toast } from 'react-toastify';

const CardComponentWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [/*createFailure*/, setCreateFailure] = useState(false);
  const { registerNote } = useContext(AuthContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const success = await registerNote(title, content);

      if (success) {
        toast.success('Cadastro realizado com sucesso!');
        setTitle(''); // Limpa o campo de título após o envio
        setContent(''); // Limpa o campo de conteúdo após o envio
      } else {
        setCreateFailure(true);
      }
    } catch (error) {
      // Trate o erro aqui, caso ocorra algum problema na requisição
      console.error('Erro ao enviar a requisição:', error);
      toast.error('Ocorreu um erro ao enviar a requisição. Tente novamente.');
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardbody}>
            {/* Campo de entrada para o título */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título"
              className={styles.cardtitleInput}
            />
            {/* Campo de entrada para o conteúdo */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite sua nota"
              className={styles.cardtextInput}
            />
            <button type="submit" className={styles.cardbutton} onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </>
  );
};

export default CardComponentWrite;
