import { FieldValue, Timestamp } from "firebase/firestore"

export type Product = {
    id?: string,
    categories: string[],
    comments?: Comment[],
    creationDate: Timestamp | FieldValue,
    creatorDisplayName: string,
    creatorUserId: string,
    creatorUsername: string,
    description: string,
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
    displayName: string,
    email: string,
    username: string,
    isAdmin: boolean,
}
