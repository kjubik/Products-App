import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "../../types";
import { postUser } from "../../api/usersApi";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const authWithGoogle = async () => {
    try {
      const authResult = await signInWithPopup(auth, provider);

      if (getAdditionalUserInfo(authResult)?.isNewUser) {
        console.log('signing in new user');
        const newUser: User = {
          id: authResult.user.uid,
          email: authResult.user.email || '',
          isAdmin: false,
        }
        await postUser(newUser);
      } else console.log('signing in existing user')

      navigate('/profile');
    } catch (error) {
      console.log('failed to sign in with Google', error);
      throw error;
    }
  }

  return (
    <button onClick={authWithGoogle}>
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
