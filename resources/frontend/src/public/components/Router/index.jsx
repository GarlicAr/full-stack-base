import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth.jsx';
import DefaultLayout from '../DefaultLayout/index.jsx';
import HomePage from '../../pages/home/HomePage.jsx';
import PostsPage from '../../pages/Posts/PostsPage.jsx';
import Create from '../../pages/Posts/Create/Create.jsx';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
}

export default function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path={'/posts'}
          element={
            <PrivateRoute>
              <PostsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={'/posts/create'}
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}
