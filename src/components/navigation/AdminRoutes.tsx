import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AdminRoutes = () => {

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

    return isAuthed === null ? <>Loading page...</> : isAuthed ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;
