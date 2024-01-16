import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "src/firebase/types/User";
import { postUser } from "../../firebase/services/users";
import { useNavigate } from "react-router-dom";
import { Button } from "src/shadcn-ui/ui/button";

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
    <Button
      variant="default" 
      onClick={authWithGoogle}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleAuthButton;
