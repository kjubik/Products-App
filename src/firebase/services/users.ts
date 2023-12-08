import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../App";
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

        const userWithoutId = {...user};
        delete userWithoutId.id;

        const userReference = doc(db, "users", user.id);
        await setDoc(userReference, userWithoutId);
    } catch (error) {
        console.log('Failed to post user', error);
        throw error;
    }
}

export const getUsername = async (userId: string): Promise<string> => {
    try {
        const queryResult = await getDoc(doc(db, "users", userId));
        if (!queryResult.exists()) throw new Error('User does not exist');
        return queryResult.data().username as string;
    } catch (error) {
        console.log('Failed to get username', error);
        throw error;
    }
}

export const isUserAdmin = async (userId: string): Promise<boolean> => {
    try {
        const queryResult = await getDoc(doc(db, "users", userId));
        if (!queryResult.exists()) throw new Error('User does not exist');
        return queryResult.data().isAdmin as boolean;
    } catch (error) {
        console.log('Failed to get username', error);
        throw error;
    }
}