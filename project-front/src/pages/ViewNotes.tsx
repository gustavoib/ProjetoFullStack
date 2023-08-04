import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import CardComponentView from '../components/CardComponentView';
import styles from './ViewNotes.module.css';
import { useState, useEffect } from 'react';
import { getNotes, api } from '../services/service';

const ViewNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const storagedUser = localStorage.getItem('user');
      const user = JSON.parse(String(storagedUser));
      const id = user.idUser;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      const response = await getNotes(id);
      setNotes(response.data);
      console.log(response.data);
    })();
  }, []);

  const compareById = (a: any, b: any) => {
    return a.idNote - b.idNote;
  };

  return (
    <>
      <HeaderComponent />
      <div className={styles.view}>
        <div className={styles.conteiner}>
          {notes.length === 0 ? (
            <h3>Você ainda não possui notas.</h3>
          ) : (
            notes.sort(compareById).map((nota) => (
              <CardComponentView key={nota.idNote} content={nota.content} title={nota.title} id={nota.idNote} date={nota.date}/>
            ))
          )}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default ViewNotes;
