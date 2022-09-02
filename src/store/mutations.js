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
  },

  async ADD_NEW_PROJECT(state, { project, uploadedImages }) {
    var imagesData = [];

    if (!state.projectRefrence) {
      console.log("good")
      const databaseReference = FirebaseService.getDatabaseReference(firebaseConfigAPI.table)
      state.projectRefrence = FirebaseService.createProjectReference(databaseReference)
    }

    //insert images to strorage to folder named by ID/key generated in database
    for (let i = 0; i < uploadedImages.length; i++) {
      const imageFile = uploadedImages[i];
      const storageRef = FirebaseService.getStorageReference(state.projectRefrence.key + '/' + imageFile.name)
      console.log(storageRef)
      var downloadURL = await getDownloadURL(storageRef).then((resultURL) => {
        imagesData.push({
          name: imageFile.name,
          url: resultURL,
          isTitle: false
        })
      })
    }

    project.images = imagesData
    const newProject = new Project(project)
    newProject.id = state.projectRefrence.key

    //insert data to database
    FirebaseService.insertDataToDatabase(state.projectRefrence, newProject)

    //update state 
    state.projects.push(newProject)

    state.projectRefrence = null
    state.uploadedFilesNames = []
    state.uploadedFilesPercents = []
    state.showMessage = true
    state.messageStatus = "success"
    state.messageText = "Project was succesfully CREATED."
  },

  async EDIT_PROJECT(state, { project, uploadedImages }) {
    var imagesData = []
    //insert images to strorage to folder named by ID/key generated in database
    for (let i = 0; i < uploadedImages.length; i++) {
      const imageFile = uploadedImages[i];
      const storageRef = FirebaseService.getStorageReference(project.id + '/' + imageFile.name)

      var downloadURL = await getDownloadURL(storageRef).then((resultURL) => {
        imagesData.push({
          name: imageFile.name,
          url: resultURL
        })
      })
    }

    //cause if edited project has not images
    if (project.images) {
      project.images = project.images.concat(imagesData)
    } else {
      project.images = [].concat(imagesData)
    }

    FirebaseService.updateDatabase(firebaseConfigAPI.table + '/' + project.id, project)

    state.uploadedFilesNames = []
    state.uploadedFilesPercents = []
    state.showMessage = true
    state.messageStatus = "success"
    state.messageText = "Project was succesfully EDITED."
  },

  DELETE_PROJECT(state, projectId) {
    const index = state.projects.findIndex(project => project.id === projectId)
    const project = state.projects[index]

    FirebaseService.deleteProject(project, firebaseConfigAPI.table)

    state.projects.splice(index, 1)

    state.showMessage = true
    state.messageStatus = "success"
    state.messageText = "Project was succesfully DELETED."
  },

  SET_SEARCH_TEXT(state, searchText) {
    state.searchText = searchText;
  },

  SET_SHOW_MESSAGE(state, showMessageValue) {
    state.showMessage = showMessageValue
  },

  UPLOAD_IMAGES(state, { images, projectId }) {

    if (typeof (projectId) !== 'string') {
      if (state.projectRefrence == undefined) {
        const databaseReference = FirebaseService.getDatabaseReference(firebaseConfigAPI.table)
        state.projectRefrence = FirebaseService.createProjectReference(databaseReference)
        projectId = state.projectRefrence.key
      } else {
        projectId = state.projectRefrence.key
      }
    }

    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i];
      const storageRef = FirebaseService.getStorageReference(projectId + '/' + imageFile.name)

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

    //3 cases of deleting image
    //1. editing uploaded images. images are written into project.images
    //2. editing curently uploaded images while editing project. images are written into storage until submit editing project
    //3. creating new project

    //if-case: editing images of existing project
    if (projectId != 0) {
      const imageIndex = state.project.images.findIndex(image => {
        if (image) {
          return image.name === imageName
        }
      })
      //if-case: is deleting image currently uploaded file or is stored in project database?
      if (imageIndex != -1) {
        //is strored in project database
        const projectIndex = state.projects.findIndex(project => {
          return project.id === projectId
        })

        imageStorageFilePath = projectId + '/' + imageName
        imageDatabaseFilePath = firebaseConfigAPI.table + '/' + projectId

        state.projects[projectIndex].images.splice(imageIndex, 1)

        //filtering cause splice remove image but write null instead of removed image
        state.projects[projectIndex].images = state.projects[projectIndex].images.filter((image) => {
          return !Array.isArray(image)
        })

        FirebaseService.updateDatabase(imageDatabaseFilePath, state.projects[projectIndex])
        FirebaseService.deleteProjectStorageImage(imageStorageFilePath)
      } else {
        //is currently uploaded and is stored in storage
        imageStorageFilePath = projectId + '/' + imageName
        const uploadedImageIndex = state.uploadedFilesNames.findIndex(image => {
          return image === imageName
        })

        FirebaseService.deleteProjectStorageImage(imageStorageFilePath)
        state.uploadedFilesNames.splice(uploadedImageIndex, 1)
      }
    } else {
      //else-case: adding new project and uploading/deleting before submit
      imageStorageFilePath = state.projectRefrence.key + '/' + imageName
      const uploadedImageIndex = state.uploadedFilesNames.findIndex(image => {
        return image === imageName
      })

      FirebaseService.deleteProjectStorageImage(imageStorageFilePath)
      state.uploadedFilesNames.splice(uploadedImageIndex, 1)
    }
  },
}