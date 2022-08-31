import { ref as stRef, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { ref as dbRef, push, set, get, update, remove } from "firebase/database";
import { database, storage } from "../assets/firebase/firebase";

class FirebaseService {
    //database functions
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

    static deleteProject(project, table) {
        project.images.forEach(image => {
            this.deleteProjectStorageImage(project.id + '/' + image.name)
        })
        this.deleteDatabaseProject(table + '/' + project.id);
    }

    static getDatabaseReference(path) {
        return dbRef(database, path)
    }

    static deleteDatabaseProject(path) {
        const databaseReference = this.getDatabaseReference(path);
        remove(databaseReference);
    }

    static deleteDatabaseProjectItem(path) {
        const databaseReference = this.getDatabaseReference(path);
        remove(databaseReference);
    }

    //storage functions
    static getStorageReference(path) {
        return stRef(storage, path)
    }

    static deleteProjectStorageImage(path) {
        const deleteStorageReference = this.getStorageReference(path)
        deleteObject(deleteStorageReference)
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