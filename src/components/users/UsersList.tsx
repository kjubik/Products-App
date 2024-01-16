import { Table, TableBody, TableHead, TableHeader, TableRow } from "src/shadcn-ui/ui/table";
import UserTableRow from "./UserTableRow";
import { User } from "src/firebase/types/User";

const UsersList = ({users}: {users: User[]}) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <UserTableRow key={user.id} user={user} />
                ))}
            </TableBody>
        </Table>
    );
}

export default UsersList;
