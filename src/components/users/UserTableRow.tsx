import { User } from "src/firebase/types/User";

const UserTableRow = ({ user }: {user: User}) => {


    return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? 'Admin' : 'User'}</td>
            <td><button>{user.isAdmin ? 'Remove' : 'Upgrade'}</button></td>
        </tr>
    );
};

export default UserTableRow;
