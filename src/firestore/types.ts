import { Timestamp } from "firebase/firestore"

export type Product = {
    id?: string,
    title: string,
    description: string,
    isDeleted: boolean,
    creationDate: Timestamp,
    creatorUserId: string,
    imageUrl: string,
    comments: Comment[],
}

export type Comment = {
    id?: string,
    productId: string,
    description: string,
    creationDate: Timestamp,
    isDeleted: boolean,
    creatorUserId: string,
}

export type Category = {
    id?: string,
    name: string,
}
