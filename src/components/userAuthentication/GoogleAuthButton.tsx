import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "../../firestore/types";
import { postUser } from "../../firestore/utils";

const GoogleAuthButton = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

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
        postUser(newUser);
      } else console.log('signing in existing user')
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
