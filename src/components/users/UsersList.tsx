import UserTableRow from "./UserTableRow";
import { User } from "src/firebase/types/User";

const UsersList = ({users}: {users: User[]}) => {

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        {/* <th>User ID</th> */}
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserTableRow key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;
