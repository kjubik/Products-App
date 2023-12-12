import { FieldValue, Timestamp } from 'firebase/firestore';

export function convertTimestampToDate(timestamp: Timestamp | FieldValue): string | null {
    if (timestamp instanceof FieldValue) {
        return null;
    }

    const date = timestamp.toDate();
    const formattedDate = date.toLocaleString('gb-GB', {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
    });

    return formattedDate;
}
