import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, loginUser, registerUser /*, getNotes*/ } from '../services/service';

export const AuthContext = createContext({} as any);

export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState<boolean>(true); 
    
    const navigate = useNavigate();

    useEffect(() => {
      const storagedUser = localStorage.getItem('user');
      
      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }, []);

    //função de login
    const login = async (email:string, password:string) => {
      try {  
        const response = await loginUser(email, password);
        
        const loggedUser = response.data.user;
        const token = response.data.token

        console.log('loggedUser', loggedUser);

        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('token', token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navigate('/home');

        return true; // Login bem-sucedido
      } catch (error) {
        return false; // Login falhou
      }
    };

    //função de logout
    const logout = () => {
      console.log('logout');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      api.defaults.headers.Authorization = null;

      setUser(null);
      navigate('/login'); 
    };

    //função de cadastro
    const register = async (name:string, email:string, password:string, phone: string) => {
      try {
        const response = await registerUser(name, email, password, phone);
        
        const registeredUser = response.data;
        console.log('registeredUser', registeredUser);
    
        return true; // Registro bem-sucedido        
      } catch (error) {
        return false; // Cadastro falhou
      };
    };

    // const listNotes = async () => {
    //   const storagedUser = localStorage.getItem('user');
    //   const user = JSON.parse(String(storagedUser));
    //   const id = user.idUser;

    //   const response = await getNotes(id);

    //   api.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    //   const notes = response.data;

    //   console.log('notes', notes);

    //   return notes;
    // };

    return (
        <AuthContext.Provider value={{authenticated: !!user, login, loading, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}