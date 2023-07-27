import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, loginUser } from '../services/service';

export const AuthContext = createContext({} as any);

export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState(null);
    const [authenticated] = useState<boolean>(false); 
    const [loading, setLoading] = useState<boolean>(true); 
    
    const navigate = useNavigate();

    useEffect(() => {
      const storagedUser = localStorage.getItem('user');
      
      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }, []);

    const login = async (email:string, password:string) => {
      const response = await loginUser(email, password);
      
      const loggedUser = response.data.user;
      const token = response.data.token;

      console.log('loggedUser', loggedUser);

      localStorage.setItem('user', JSON.stringify(loggedUser));
      localStorage.setItem('token', token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser(loggedUser);
      navigate('/home');
    };

    const logout = () => {
      console.log('logout');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      api.defaults.headers.Authorization = null;

      console.log('authenticated', authenticated);
      
      setUser(null);
      navigate('/login'); 
    
    };

    return (
        <AuthContext.Provider value={{authenticated: !!user, login, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}