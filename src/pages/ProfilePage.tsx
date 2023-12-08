import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getUser } from '../firebase/services/usersServices';
import { User } from '../firebase/types';

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
          <li>{user?.username}</li>
          <li>{user?.email}</li>
          {user?.isAdmin ? <li>Admin account</li> : null}
        </ul>
      )}
    </>
  );
};

export default ProfilePage;
