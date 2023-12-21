import { useState, useEffect } from 'react';

export default function useUser() {
  const initState = {
    user: {
      id: 0,
      name: '',
      email: '',
      email_verified_at: null,
      created_at: '',
      updated_at: '',
    },
    access_token: '',
    role: '',
  };

  const [user, setUser] = useState(initState);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return user;
}
