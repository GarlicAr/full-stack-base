import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/config.jsx';

export default function useAuth() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('auth_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    async function fetchAuthUser() {
      try {
        const response = await axios.get(`${BASE_URL}/api/user`, {
          withCredentials: true,
        });

        if (response.data.authenticated === false) {
          localStorage.removeItem('auth_user');
          setUser(null);
        } else {
          localStorage.setItem('auth_user', JSON.stringify(response.data));
          setUser(response.data);
        }
      } catch (error) {
        localStorage.removeItem('auth_user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (!user) fetchAuthUser();
  }, []);

  return { user, loading };
}

export function clearAuthUser() {
  localStorage.removeItem('auth_user');
}
