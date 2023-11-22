import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../App";
import { User } from "../types";


export const getUser = async (userId: string): Promise<User> => {
    try {
        const queryResult = await getDoc(doc(db, "users", userId));
        return queryResult.data() as User;
    } catch (error) {
        console.log('Failed to get user', error);
        throw error;
    }
}

export const postUser = async (user: User): Promise<void> => {
    try {
        if (!user.id) throw new Error('User id is not defined');

        var userWithoutId = {...user};
        delete userWithoutId.id;

        const userReference = doc(db, "users", user.id);
        await setDoc(userReference, userWithoutId);
    } catch (error) {
        console.log('Failed to post user', error);
        throw error;
    }
}