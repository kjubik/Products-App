import { FieldValue, Timestamp } from "firebase/firestore"


export type Product = {
    id?: string,
    categories: string[],
    // comments?: Comment[],
    creationDate: Timestamp | FieldValue,
    creatorDisplayName: string,
    creatorUserId: string,
    creatorUsername: string,
    description: string,
    imageUrl: string,
    isDeleted: boolean,
    title: string,
}
