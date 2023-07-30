import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ViewNotes from './pages/ViewNotes';
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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<Private><HomePage /></Private>} />
            <Route path="/list-notes" element={<Private><ViewNotes /></Private>} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
