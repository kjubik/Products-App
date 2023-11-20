import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleAuthButton = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const authWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      if (auth.currentUser) {
        console.log('user is authenticated', auth.currentUser.uid);
      } else {
        console.log('user is not authenticated');
      }
    } catch (error) {
      console.log('failed to sign in with Google', error);
    }
  };

  return (
    <button onClick={authWithGoogle}>
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
