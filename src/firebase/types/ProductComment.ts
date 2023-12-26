import { FieldValue, Timestamp } from "firebase/firestore"


export type ProductComment = {
    id?: string,    
    description: string,
    isDeleted: boolean,
    productId: string,
    creatorUserId: string,
    creatorUsername: string,
    creationDate: Timestamp | FieldValue,
}
