import UsersList from "src/components/users/UsersList";
import { useEffect, useState } from "react";
import { User } from "src/firebase/types/User";
import { getAllUsers } from "src/firebase/services/users";


const UsersPage = () => {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getAllUsers();
            setUsers(data);
            setIsLoaded(true);
        };

        fetchUsers();
        console.log(users);
    }, []);
    
    return(<>
        <h1>Users Page</h1>
        {isLoaded ? <UsersList users={users} /> : <p>Loading users...</p>}
    </>)
}

export default UsersPage;
