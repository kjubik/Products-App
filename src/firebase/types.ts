import { FieldValue, Timestamp } from "firebase/firestore"

// TODO: Refactor each type into separate file

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


export type ProductComment = {
    id?: string,    
    description: string,
    isDeleted: boolean,
    productId: string,
    creatorUserId: string,
    creatorUsername: string,
    creationDate: Timestamp | FieldValue,
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
