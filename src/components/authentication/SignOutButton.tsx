import { getAuth, signOut } from "firebase/auth";
import { Button } from "@/shadcn-ui/ui/button";


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
    <Button 
      variant={'outline'} 
      onClick={handleSignOut}
      className="gap-2"
    >
      Sign Out <span className="material-symbols-rounded text-lg">logout</span>
    </Button>
  );
};

export default SignOutButton;
