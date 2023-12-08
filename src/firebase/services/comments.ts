import { db } from 'src/App';
import { Comment } from 'src/firebase/types';
import { collection, addDoc, query, getDocs, orderBy } from 'firebase/firestore';


export const createComment = async (comment: Comment) => {
    try {
        const commentsRef = collection(db, 'comments');
        await addDoc(commentsRef, comment);
    } catch (error) {
        console.log('Failed to create comment', error);
        throw error;
    }
}

export const getComments = async (productId: string) => {
    try {
        const commentsReference = collection(db, `products/${productId}/comments`);
        const q = query(commentsReference, orderBy('creationDate', 'desc'));
        const querySnapshot = await getDocs(q);
        const comments: Comment[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Comment);
        return comments;
    } catch (error) {
        console.log('Failed to get comments', error);
        throw error;
    }
}
