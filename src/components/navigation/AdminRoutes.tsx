import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAdminStatus } from "src/firebase/getAdminStatus";

const AdminRoutes = () => {

    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkIfAdmin = async () => {
            getAdminStatus().then((adminStatus) => {
                if (adminStatus) {
                    console.log('allowing access to admin routes');
                    setIsAdmin(true);
                } else {
                    console.log('denied access to admin routes');
                    setIsAdmin(false);
                }
            });
        }

        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                console.log('allowing access to protected routes');
                checkIfAdmin();
            } else {
                console.log('denied access to protected routes');
                setIsAdmin(false);
            }
        });
    }, []);

    return isAdmin === null ? <>Loading page...</> : isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;
