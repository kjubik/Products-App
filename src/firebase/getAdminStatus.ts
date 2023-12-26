import { db, auth } from "src/App";
import { User } from "src/firebase/types/User";
import { doc, getDoc } from "firebase/firestore";

export const getAdminStatus = async () => {
    // Get the current user
    const user = auth.currentUser;
    if (!user) return false;

    // Get the user data from the database
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data() as User;
    if (!userData) return false;

    
    return userData.isAdmin;
}
