import GoogleAuthButton from "./userAuthentication/GoogleAuthButton";
import SignOutButton from "./userAuthentication/SignOutButton";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";


const Navbar = () => {

    const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                console.log('allowing access to protected routes');
                setIsAuthed(true);
            } else {
                console.log('denied access to protected routes');
                setIsAuthed(false);
            }
        });
    }, []);

    return (
        <>
        <nav>
            <h1>ProductPal</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="products">Products</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
            {isAuthed ? <SignOutButton /> : <GoogleAuthButton />}
        </nav>
        </>
    );
  };
  
  export default Navbar;
  