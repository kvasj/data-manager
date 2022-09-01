import firebaseConfigAPI from '../assets/firebase/configAPI'
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { get } from "firebase/database";
import FirebaseService from '../services/firebaseService';
import Project from '../utils/project';


export default {

  SET_PROJECTS(state) {
    const databaseReference = FirebaseService.getDatabaseReference(firebaseConfigAPI.table);

    get(databaseReference).then(snapshot => {
      snapshot.forEach((childSnapshot) => {
        const projectData = childSnapshot.val();
        const project = new Project(projectData)
        state.projects.push(project)
      });
    }).catch(() => {
      state.showMessage = true
      state.messageStatus = "error"
      state.messageText = "ERROR: Something went wrong with fetching data!"
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

    const path = firebaseConfigAPI.table + '/' + projectId;
    const updateDataObject = {
      "published": !searchedProject.published
    };

    FirebaseService.updateDatabase(path, updateDataObject);

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
      const databaseReference = FirebaseService.getDatabaseReference(firebaseConfigAPI.table)
      state.projectRefrence = FirebaseService.createProjectReference(databaseReference)
    }

    //insert images to strorage to folder named by ID/key generated in database
    for (let i = 0; i < newProjectObject.images.length; i++) {

      const imageFile = newProjectObject.images[i];
      const storageRef = FirebaseService.getStorageReference(state.projectRefrence.key + '/' + imageFile.name)

      var downloadURL = await getDownloadURL(storageRef).then((resultURL) => {
        imagesData.push({
          name: imageFile.name,
          url: resultURL
        })
      })
    }

    newProjectObject.images = imagesData
    const newProject = new Project(newProjectObject)
    newProject.id = state.projectRefrence.key

    //insert data to database
    FirebaseService.insertDataToDatabase(state.projectRefrence, newProject)

    //update state 
    state.projects.push(newProject)

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

    FirebaseService.updateDatabase(firebaseConfigAPI.table + '/' + editedProject.id, editedProject)

    const projectIndex = state.projects.findIndex((project => project.id === editedProject.id));
    state.projects[projectIndex].name = editedProject.name
    state.projects[projectIndex].featured = editedProject.featured
    state.projects[projectIndex].madeFor = editedProject.madeFor
    state.projects[projectIndex].categories = editedProject.categories
    state.projects[projectIndex].aboutProject = editedProject.aboutProject
    state.projects[projectIndex].date = editedProject.date
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

  DELETE_PROJECT(state, projectId) {
    const index = state.projects.findIndex(project => project.id === projectId)
    const project = state.projects[index]

    FirebaseService.deleteProject(project, firebaseConfigAPI.table)

    state.projects.splice(index, 1)

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
      const databaseReference = FirebaseService.getDatabaseReference(firebaseConfigAPI.table)
      state.projectRefrence = FirebaseService.createProjectReference(databaseReference)
    }

    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i];
      const storageRef = FirebaseService.getStorageReference(state.projectRefrence.key + '/' + imageFile.name)

      state.uploadedFilesNames.push(imageFile.name)

      uploadBytesResumable(storageRef, imageFile).on('state_changed', (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        state.uploadedFilesPercents[imageFile.name] = percentage
      })
    }
  },

  DELETE_IMAGE(state, { imageName, projectId }) {
    var imageStorageFilePath = ''
    var imageDatabaseFilePath = ''

    if (projectId != null) {
      const imageIndex = state.project.images.findIndex(image =>
        image.name === imageName
      )
      const projectIndex = state.projects.findIndex(project =>
        project.id === projectId
      )
      imageStorageFilePath = projectId + '/' + imageName
      imageDatabaseFilePath = firebaseConfigAPI.table + '/' + projectId + '/images/' + imageIndex

      FirebaseService.deleteProjectStorageImage(imageStorageFilePath)
      FirebaseService.deleteDatabaseProjectItem(imageDatabaseFilePath)
      state.projects[projectIndex].images.splice(imageIndex, 1)
      //state.project.images.splice(imageIndex, 1)
    } else {
      imageStorageFilePath = state.projectRefrence.key + '/' + imageName
      const uploadedImageIndex = state.uploadedFilesNames.findIndex(image =>
        image === imageName
      )

      FirebaseService.deleteProjectStorageImage(imageStorageFilePath)
      state.uploadedFilesNames.splice(uploadedImageIndex, 1)
    }
  },
}