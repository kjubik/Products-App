import { User } from "src/types/User";

type UserRowProps = {
    user: User;
};


const UserRow = ({ user }: UserRowProps) => {
    
    const handleToggleAdmin = () => {
        user.isAdmin = !user.isAdmin;
    };

    return (
        <tr>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? "Admin" : "User"}</td>
            <td>
                <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleToggleAdmin()}
                >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                </button>
            </td>
        </tr>
    );
};

export default UserRow;
