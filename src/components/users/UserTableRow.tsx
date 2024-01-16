import { User } from "src/firebase/types/User";
import { useState } from "react";
import { updateUser } from "src/firebase/services/users";
import { TableCell, TableRow } from "src/shadcn-ui/ui/table";

const UserTableRow = ({ user }: {user: User}) => {

    const [userRole, setUserRole] = useState<boolean>(user.isAdmin);

    const handleChangeRole = async () => {
        if (!user.id) return;
        setUserRole(!userRole);
        console.log('Change role');
        await updateUser(user.id, {isAdmin: !userRole} as User);
    }

    return (
        <TableRow key={user.id}>
            {/* <td>{user.id}</td> */}
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{userRole ? 'Admin' : 'User'}</TableCell>
            <TableCell><button onClick={handleChangeRole}>{userRole ? 'Remove' : 'Upgrade'}</button></TableCell>
        </TableRow>
    );
};

export default UserTableRow;
