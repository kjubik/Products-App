import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getUser } from '../api/usersApi';
import { User } from '../types';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      if (!auth.currentUser) return;
      const userData = await getUser(auth.currentUser.uid);
      setUser(userData);
      
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <>
      {isLoading ? <>Loading user data...</> : (
        <ul>
          {user ? <li>{user.email}</li> : null}
          {user?.isAdmin ? <li>Admin</li> : null}
        </ul>
      )}
    </>
  );
};

export default ProfilePage;
