import axios from 'axios'
import firebaseConfigAPI from '../assets/firebase/configAPI'

import { ref as stRef, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { ref as dbRef, push, set, get, update, remove, onValue } from "firebase/database";
import { database, storage } from "../assets/firebase/firebase";


export default {

  SET_PROJECTS(state) {
    const databaseReference = dbRef(database, firebaseConfigAPI.table);
    get(databaseReference).then((snapshot) => {
      if (snapshot.exists) {
        snapshot.forEach((childSnapschot) => {
          const key = childSnapschot.key
          const projectData = childSnapschot.val();
          var imagesUrls = [];

          const storageRefDownload = stRef(storage, "images/" + 'Screenshot 2022-08-18 125812.png');
          getDownloadURL(storageRefDownload).then((url) => {
            imagesUrls.push(url)
          });
          const project = Object.assign({ id: key, images: imagesUrls }, projectData)
          state.projects.push(project)
        });
      } else {
        throw Error
      }
    }).catch(() => {
      state.showMessage = true
      state.messageStatus = "error"
      state.messageText = "ERROR: No data!"
    });
  },

  SET_PROJECT(state, projectId) {
    state.project = state.projects.filter(project => {
      return project.id === projectId
    })[0]
  },

  async SET_PUBLICITY(state, projectId) {
    const searchedProject = state.projects.filter(project => {
      return project.id === projectId
    })[0]

    const databaseReference = dbRef(database, firebaseConfigAPI.table + '/' + projectId);
    update(databaseReference, {
      "published": !searchedProject.published
    });

    searchedProject.published = !searchedProject.published
    /*
    TODO: Catch errors
      state.showMessage = true
      state.messageStatus = "error"
      state.messageText = "ERROR: Something went wrong."
    */
  },

  async ADD_NEW_PROJECT(state, newProjectObject) {
    await axios.post(firebaseConfigAPI.databaseURL + '/' + firebaseConfigAPI.table + firebaseConfigAPI.format, {
      projectName: newProjectObject.projectName,
      featured: newProjectObject.featured,
      madeFor: newProjectObject.madeFor,
      categories: newProjectObject.categories,
      aboutProject: newProjectObject.aboutProject,
      date: newProjectObject.date,
      published: newProjectObject.published
    }).then((response) => {
      if (response.status === 200 && response.data != null) {
        const projectId = response.data.name;
        const project = Object.assign({ id: projectId }, newProjectObject)
        state.projects.push(project)
        state.showMessage = true
        state.messageStatus = "success"
        state.messageText = "Project was succesfully CREATED."
      } else {
        throw Error();
      }
    }).catch(() => {
      state.showMessage = true
      state.messageStatus = "error"
      state.messageText = "ERROR: Something went wrong."
    })
  },

  async EDIT_PROJECT(state, editedProject) {
    await axios.patch(firebaseConfigAPI.databaseURL + '/' + firebaseConfigAPI.table + "/" + editedProject.id + "/" + firebaseConfigAPI.format, {
      projectName: editedProject.projectName,
      featured: editedProject.featured,
      madeFor: editedProject.madeFor,
      categories: editedProject.categories,
      aboutProject: editedProject.aboutProject,
      date: editedProject.date,
      published: editedProject.published
    }
    ).then((response) => {
      if (response.status === 200 && response.data != null) {
        const projectId = editedProject.id;
        const editedProjectData = response.data
        const projectIndex = state.projects.findIndex((project => project.id === projectId));
        state.projects[projectIndex].projectName = editedProjectData.projectName,
          state.projects[projectIndex].featured = editedProjectData.featured,
          state.projects[projectIndex].madeFor = editedProjectData.madeFor,
          state.projects[projectIndex].categories = editedProjectData.categories,
          state.projects[projectIndex].aboutProject = editedProjectData.aboutProject,
          state.projects[projectIndex].date = editedProjectData.date,
          state.projects[projectIndex].published = editedProjectData.published

        state.showMessage = true
        state.messageStatus = "success"
        state.messageText = "Project was succesfully EDITED."
      } else {
        throw Error();
      }
    }).catch(() => {
      state.showMessage = true
      state.messageStatus = "error"
      state.messageText = "ERROR: Something went wrong."
    })
  },

  DELETE_PROJECT(state, projectId) {
    //delete data Database
    const databaseReference = dbRef(database, firebaseConfigAPI.table + '/' + projectId);
    remove(databaseReference);

    const projectIndex = state.projects.findIndex(project => project.id === projectId)
    state.projects.splice(projectIndex, 1)

    /*
    //delete data from Storage
    var filename = 'asdadas.jpg'
    const deleteStorageReference = stRef(storage, 'myPics/' + filename)
    deleteObject(deleteStorageReference)
    */

    state.showMessage = true
    state.messageStatus = "success"
    state.messageText = "Project was succesfully DELETED."

    /*
    .catch(() => {
      state.showMessage = true
      state.messageStatus = "error"
      state.messageText = "ERROR: Faild to delete project."
    })
    */
  },

  SET_SEARCH_TEXT(state, searchText) {
    state.searchText = searchText;
  },

  SET_SHOW_MESSAGE(state, showMessageValue) {
    state.showMessage = showMessageValue
  }
}