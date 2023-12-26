import UserTableRow from "./UserTableRow";
import { User } from "src/firebase/types/User";

const UsersList = () => {

    const users: User[] = [
        {
            displayName: "John",
            email: "john@mail.com",
            username: "john",
            isAdmin: false
        },
        {
            displayName: "Jane",
            email: "jane@mail.com",
            username: "jane",
            isAdmin: true
        }
    ];

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
