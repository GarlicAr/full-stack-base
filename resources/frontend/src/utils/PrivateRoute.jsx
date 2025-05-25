import { Spin } from 'antd';
import useAuth from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Spin />;

  return user.authenticated ? children : <Navigate to="/login" replace />;
}
