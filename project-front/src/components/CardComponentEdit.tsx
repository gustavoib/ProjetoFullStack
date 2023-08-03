import { useState, useContext } from 'react';
import styles from './CardWrite.module.css';
import { AuthContext } from '../contexts/auth';
import { toast } from 'react-toastify';

type CardComponentEditProps = {
    id: number;
    initial_title: string;
    initial_content: string;
  };
  
const CardComponentEdit: React.FC<CardComponentEditProps> = ({ id, initial_title, initial_content }) => {
  const [title, setTitle] = useState(initial_title);
  const [content, setContent] = useState(initial_content);
  const [/*createFailure*/, setCreateFailure] = useState(false);
  const { editNote } = useContext(AuthContext);
  
  const handleEditNote =  (e: any) => {
    e.preventDefault();
    editNote(id, title, content);

    try {
        const success = editNote(id, title, content);
  
        if (success) {
          toast.success('Nota atualizada com sucesso!');
          setTitle(''); 
          setContent(''); 
        } else {
          setCreateFailure(true);
        }
      } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
        toast.error('Ocorreu um erro ao enviar a requisição. Tente novamente.');
      }

      window.location.reload();
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
            <button type="submit" className={styles.cardbutton} onClick={handleEditNote}>Salvar</button>
        </div>
      </div>
    </>
  );
};

export default CardComponentEdit;
