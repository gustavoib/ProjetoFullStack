import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { ILogin } from '../interfaces/Login';
import { useNavigate } from 'react-router-dom';
import { api, loginUser } from '../services/service';

export const AuthContext = createContext({} as any);

export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState<ILogin>();
    //const [token, setToken] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true); // [true, function
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

      console.log('response', response);
      
      const loggedUser = {
        email: email,
        password: password,
      }
      const token = response.data.token;

      //console.log('loggedUser', loggedUser);
      //console.log('token', token);

      localStorage.setItem('user', JSON.stringify(loggedUser));
      localStorage.setItem('token', token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      //setUser(loggedUser);
      
      setUser({email, password, token});
      navigate('/home');
    };

    const logout = () => {
      console.log('logout');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      api.defaults.headers.Authorization = null;
      
      setUser({email: '', password: '', token: ''});
      navigate('/login');
    };

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, login, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}