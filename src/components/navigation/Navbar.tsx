import GoogleAuthButton from "../authentication/GoogleAuthButton";
import SignOutButton from "../authentication/SignOutButton";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Link } from "react-router-dom";


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
        <nav className="w-full bg-slate-200 flex items-center align-center justify-between px-8 py-4">
            <h1 className="font-bold"><Link to="/">produkty app</Link></h1>
            <ul className="flex gap-8">
                <li><Link to="/products" className="text-blue-500 hover:text-blue-700 font-semibold">Products</Link></li>
                <li><Link to="/profile" className="text-blue-500 hover:text-blue-700 font-semibold">Profile</Link></li>
                <li><Link to="/users" className="text-blue-500 hover:text-blue-700 font-semibold">Users</Link></li>
            </ul>
            {isAuthed ? <SignOutButton /> : <GoogleAuthButton />}
        </nav>
        </>
    );
  };
  
  export default Navbar;
  