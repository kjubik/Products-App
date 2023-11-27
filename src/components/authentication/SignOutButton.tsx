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
    <button onClick={handleSignOut}
    className="rounded bg-slate-300 hover:bg-slate-400 px-2 py-1 text-slate-900 font-semibold">
      Sign Out
    </button>
  );
};

export default SignOutButton;
