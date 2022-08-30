import { ref as stRef, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { ref as dbRef, push, set, get, update, remove } from "firebase/database";
import { database, storage } from "../assets/firebase/firebase";

class FirebaseService {

    static insertDataToDatabase(projectReference, dataObject) {
        set(projectReference, dataObject);
    }

    static updateDatabase(path, updataDataObject) {
        const databaseReference = this.getDatabaseReference(path)
        return update(databaseReference, updataDataObject);
    }

    static createProjectReference(databaseReference) {
        return push(databaseReference)
    }

    static getDatabaseReference(path) {
        return dbRef(database, path)
    }

    static getStorageReference(path) {
        return stRef(storage, path)
    }

    /* non-functional
    static async getDownloadUrl(storageReference) {
        await getDownloadURL(storageReference).then((resultURL) => {
            return resultURL
        })
    }
    */
}

export default FirebaseService