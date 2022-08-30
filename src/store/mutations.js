import axios from 'axios'
import firebaseConfigAPI from '../assets/firebase/configAPI'

import { ref as stRef, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { ref as dbRef, push, set, get, update, remove } from "firebase/database";
import { database, storage } from "../assets/firebase/firebase";


export default {

  SET_PROJECTS(state) {
    const databaseReference = dbRef(database, firebaseConfigAPI.table);
    get(databaseReference).then((snapshot) => {
      if (snapshot.exists) {
        snapshot.forEach((childSnapschot) => {
          const key = childSnapschot.key
          const projectData = childSnapschot.val();
          var imagesData = [];
          /*
          const storageRefDownload = stRef(storage, key + '/' + 'Screenshot 2022-08-18 125812.png');
          getDownloadURL(storageRefDownload).then((url) => {
            imagesData.push({
              name: 'Screenshot 2022-08-18 125812.png',
              url: url
            })
          });
          */
          const project = Object.assign({ id: key, images: imagesData }, projectData)
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

  SET_PUBLICITY(state, projectId) {
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
    var imagesData = [];

    if (state.projectRefrence == null) {
      const databaseReference = dbRef(database, firebaseConfigAPI.table)
      state.projectRefrence = push(databaseReference)
    }

    //insert images to strorage to folder named by ID/key generated in database
    for (let i = 0; i < newProjectObject.images[0].length; i++) {

      const imageFile = newProjectObject.images[0][i];
      const storageRef = stRef(storage, state.projectRefrence.key + '/' + imageFile.name)
      
      var downloadURL = await getDownloadURL(storageRef).then((resultURL) => {
        imagesData.push([imageFile.name, resultURL])
      })
    }

    const newProject = {
      projectName: newProjectObject.projectName,
      featured: newProjectObject.featured,
      madeFor: newProjectObject.madeFor,
      categories: newProjectObject.categories,
      aboutProject: newProjectObject.aboutProject,
      date: newProjectObject.date,
      images: imagesData,
      published: newProjectObject.published,
    }

    //insert data to database
    set(state.projectRefrence, newProject);

    //update state 
    const project = Object.assign({ id: state.projectRefrence.key }, newProject)
    state.projects.push(project)

    state.projectRefrence = null
    //state.uploadedFilesNames = []
    //state.uploadedFilesPercents = []
    state.showMessage = true
    state.messageStatus = "success"
    state.messageText = "Project was succesfully CREATED."
    /*
    .catch(() => {
      state.showMessage = true
      state.messageStatus = "error"
      state.messageText = "ERROR: Something went wrong."
    })
    */
  },

  EDIT_PROJECT(state, editedProject) {

    const databaseReference = dbRef(database, firebaseConfigAPI.table + '/' + editedProject.id);
    update(databaseReference, {
      projectName: editedProject.projectName,
      featured: editedProject.featured,
      madeFor: editedProject.madeFor,
      categories: editedProject.categories,
      aboutProject: editedProject.aboutProject,
      date: editedProject.date,
      //images: editedProject.images,
      published: editedProject.published
    });

    const projectIndex = state.projects.findIndex((project => project.id === editedProject.id));
    state.projects[projectIndex].projectName = editedProject.projectName,
      state.projects[projectIndex].featured = editedProject.featured,
      state.projects[projectIndex].madeFor = editedProject.madeFor,
      state.projects[projectIndex].categories = editedProject.categories,
      state.projects[projectIndex].aboutProject = editedProject.aboutProject,
      state.projects[projectIndex].date = editedProject.date,
      state.projects[projectIndex].published = editedProject.published

    state.showMessage = true
    state.messageStatus = "success"
    state.messageText = "Project was succesfully EDITED."

    /*
    .catch(() => {
      state.showMessage = true
      state.messageStatus = "error"
      state.messageText = "ERROR: Something went wrong."
    })
    */
  },

  //TODO: delete images too
  async DELETE_PROJECT(state, projectId) {
    const projectIndex = state.projects.findIndex(project => project.id === projectId)

    //delete storage data
    state.projects[projectIndex].images.forEach(image => {
      const deleteStorageReference = stRef(storage, projectId + '/' + image[0])
      deleteObject(deleteStorageReference)
    })

    //delete data Database
    const databaseReference = dbRef(database, firebaseConfigAPI.table + '/' + projectId);
    remove(databaseReference);

    state.projects.splice(projectIndex, 1)

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
  },

  UPLOAD_IMAGES(state, images) {    
    if (state.projectRefrence == null) {
      const databaseReference = dbRef(database, firebaseConfigAPI.table)
      state.projectRefrence = push(databaseReference)
    }

    for (let i = 0; i < images[0].length; i++) {
      const imageFile = images[0][i];
      const storageRef = stRef(storage, state.projectRefrence.key + '/' + imageFile.name)

      state.uploadedFilesNames.push(imageFile.name)

      uploadBytesResumable(storageRef, imageFile).on('state_changed', (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        state.uploadedFilesPercents[imageFile.name] = percentage
      })
    }
  },

  DELETE_IMAGE(state, imageName) {
    var filePath = state.projectRefrence.key + '/' + imageName
    const deleteStorageReference = stRef(storage, filePath)
    deleteObject(deleteStorageReference)
    const projectIndex = state.uploadedFilesNames.findIndex(project =>
      project === imageName
    )
    state.uploadedFilesNames.splice(projectIndex, 1)
  },

  DELETE_IMAGES(state, images) {
    images.forEach(image => {
      var filePath = state.projectRefrence.key + '/' + image
      const deleteStorageReference = stRef(storage, filePath)
      deleteObject(deleteStorageReference)
    });
  }
}