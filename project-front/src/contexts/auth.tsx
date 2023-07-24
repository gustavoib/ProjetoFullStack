import React, { createContext } from 'react';
import { useState } from 'react';
import { ILogin } from '../interfaces/Login';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({} as any);

export const AuthProvider = ({children}:any) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<ILogin>();
  
    const login = (email:string, password:string) => {
      console.log('login auth',{email, password});
      setUser({email, password});
    }

    const logout = () => {
      console.log('logout');
    };

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
