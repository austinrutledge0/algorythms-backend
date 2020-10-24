export const apiRecordsNotInsertedMessage = (ids:string[]) => {
   return "Did not add records with ids " +
    ids.toString() +
    " because they are duplicates"
}
export const apiRecordsNotDeletedMessage = (ids:string[]) => {
   return "Did not delete records with ids " +
       ids.toString() +
       " because they do not exist"
}