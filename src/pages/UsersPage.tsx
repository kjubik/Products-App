import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, getAllUsers } from "src/firebase/services/users";
import { getAuth } from "firebase/auth";
import { User } from "src/types/User";
import UserRow from "src/components/users/UserRow";


const UsersPage = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

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

        const getUsersFromFirestore = async () => {
            if (!loading) return;
            const users = await getAllUsers();
            setUsers(users);
            setLoading(false);
        }

        checkUserIsAdmin();
        getUsersFromFirestore();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserRow key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
