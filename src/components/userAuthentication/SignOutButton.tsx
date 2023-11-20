import { getAuth, signOut } from "firebase/auth";


const SignOutButton = () => {

    const auth = getAuth();

    const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully");
            window.location.reload();
        })
        .catch((error) => {
            console.log("Error signing out:", error);
        });
    };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
