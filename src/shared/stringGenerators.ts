export const apiRecordsNotInsertedMessage = (ids:string[]) => {
   return "Did not add records with ids " +
    ids.toString() +
    " because they are duplicates"
}