import SignOutButton from "../authentication/SignOutButton";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { getAdminStatus } from "src/firebase/utils/getAdminStatus";


const Navbar = () => {

    const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkIfAdmin = async () => {
            setIsAdmin(await getAdminStatus());
        }

        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                console.log('allowing access to protected routes');
                setIsAuthed(true);
                checkIfAdmin();
            } else {
                console.log('denied access to protected routes');
                setIsAuthed(false);
            }
        });
    }, []);

    return (
        <>
        <nav className="w-full bg-slate-200 flex items-center align-center justify-between px-8 py-4">
            <h1 className="font-bold"><Link to="/">Products App</Link></h1>
            {isAuthed ?
            <ul className="flex gap-8">
                <li><Link to="/products" className="text-blue-500 hover:text-blue-700 font-semibold">Products</Link></li>
                <li><Link to="/profile" className="text-blue-500 hover:text-blue-700 font-semibold">Profile</Link></li>
                {isAdmin && <li><Link to="/users" className="text-blue-500 hover:text-blue-700 font-semibold">Users</Link></li>}
            </ul> 
            : <></>}
            {isAuthed ? <SignOutButton /> 
            : <>
            <div className="flex gap-4">
                <Link to='/create-account' className="rounded-full bg-blue-500 hover:bg-blue-700 px-4 py-1 text-white font-semibold">
                    Create Account
                </Link>
                <Link to='/sign-in' className="rounded-full bg-slate-400 hover:bg-slate-600 px-4 py-1 text-white font-semibold">
                    Sign In
                </Link>
            </div>
            </>}
        </nav>
        </>
    );
  };
  
  export default Navbar;
  