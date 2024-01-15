import { User } from "src/firebase/types/User";
import { useState } from "react";
import { updateUser } from "src/firebase/services/users";

const UserTableRow = ({ user }: {user: User}) => {

    const [userRole, setUserRole] = useState<boolean>(user.isAdmin);

    const handleChangeRole = async () => {
        if (!user.id) return;
        setUserRole(!userRole);
        console.log('Change role');
        await updateUser(user.id, {isAdmin: !userRole} as User);
    }

    return (
        <tr key={user.id}>
            {/* <td>{user.id}</td> */}
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? 'Admin' : 'User'}</td>
            <td><button onClick={handleChangeRole}>{userRole ? 'Remove' : 'Upgrade'}</button></td>
        </tr>
    );
};

export default UserTableRow;
