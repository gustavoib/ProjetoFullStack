import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AuthProvider } from './contexts/auth';
import { useContext } from 'react';
import { AuthContext } from './contexts/auth';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

const AppRoutes = () => {
  const Private = ({children}:any) => {
    const {authenticated, loading} = useContext(AuthContext);
    
    if (loading){
      return <div className='loading'>Carregando...</div>
    }
    if (!authenticated){
      return <Navigate to="/login" />
    }
    return children;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Private><HomePage /></Private>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
