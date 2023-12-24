import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "src/firebase/services/users";
import { getAuth } from "firebase/auth";


const UsersPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserIsAdmin = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getUser(user.uid);
                if (!userDoc || !userDoc.isAdmin) {
                    navigate("/profile");
                }
            }
        };

        checkUserIsAdmin();
    }, []);

    return (
        <div>
            <h1>Users</h1>
        </div>
    );
};

export default UsersPage;
