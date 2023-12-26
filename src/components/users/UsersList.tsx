import UserTableRow from "./UserTableRow";
import { User } from "src/firebase/types/User";

const UsersList = ({users}: {users: User[]}) => {

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users.map((user) => (
                    <UserTableRow user={user} />
                ))}
            </ul>
        </div>
    );
}

export default UsersList;
