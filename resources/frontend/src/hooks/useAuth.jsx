import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/config.jsx';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthUser() {
      try {
        const response = await axios.get(`${BASE_URL}/api/user`, {
          withCredentials: true,
        });

        if (response.data.authenticated === false) {
          setUser(null);
        } else {
          setUser(response.data);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthUser();
  }, []);

  return { user, loading };
}
