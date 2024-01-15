import { FieldValue, Timestamp } from "firebase/firestore"


export type Product = {
    id?: string,
    categories: string[],
    creationDate: Timestamp | FieldValue,
    creatorUserId: string,
    creatorUsername: string,
    description: string,
    imageUrl: string,
    isDeleted: boolean,
    title: string,
}
