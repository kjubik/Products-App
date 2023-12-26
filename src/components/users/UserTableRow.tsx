import { User } from "src/firebase/types/User";

const UserTableRow = ({ user }: {user: User}) => {


    return (
        <li key={user.id}>
            {user.displayName} - {user.email}
        </li>
    );
};

export default UserTableRow;
