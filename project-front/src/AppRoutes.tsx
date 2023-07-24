import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import { AuthProvider } from './contexts/auth';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/home" element={<HomeComponent />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
