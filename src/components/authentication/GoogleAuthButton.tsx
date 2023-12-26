import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "src/firebase/types/User";
import { postUser } from "../../firebase/services/users";
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
          displayName: authResult.user.displayName || '',
          username: authResult.user.displayName || '',
          isAdmin: false,
        }
        await postUser(newUser);
        // TODO: check if user was added in database, eventually rollback signInWithPopup
        // and vice versa(?)
      } else console.log('signing in existing user')

      navigate('/profile');
    } catch (error) {
      console.log('failed to sign in with Google', error);
      throw error;
    }
  }

  return (
    <button onClick={authWithGoogle}
    className="rounded-full bg-blue-500 hover:bg-blue-700 px-4 py-1 text-white font-semibold">
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
