import { FieldValue, Timestamp } from "firebase/firestore"

export type Product = {
    categories: string[],
    comments?: Comment[],
    creationDate: Timestamp | FieldValue,
    creatorUserId: string,
    creatorUsername: string,
    description: string,
    id?: string,
    imageUrl: string,
    isDeleted: boolean,
    title: string,
}

export type Comment = {
    id?: string,    
    description: string,
    creationDate: Timestamp,
    isDeleted: boolean,
    creatorUserId: string,
}

export type Category = {
    id?: string,
    name: string,
}

export type User = {
    id?: string,
    email: string,
    username: string,
    isAdmin: boolean,
}
