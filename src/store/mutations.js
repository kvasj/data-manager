import firebaseConfigAPI from '../assets/firebase/configAPI'
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { get } from "firebase/database";
import FirebaseService from '../services/firebaseService';


export default {

  SET_PROJECTS(state) {
    const databaseReference = FirebaseService.getDatabaseReference(firebaseConfigAPI.table);
    get(databaseReference).then((snapshot) => {
      if (snapshot.exists) {
        snapshot.forEach((childSnapschot) => {
          const key = childSnapschot.key
          const projectData = childSnapschot.val();
          const imagesData = []
          
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
    for (let i = 0; i < newProjectObject.images[0].length; i++) {

      const imageFile = newProjectObject.images[0][i];
      const storageRef = FirebaseService.getStorageReference(state.projectRefrence.key + '/' + imageFile.name)

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
    FirebaseService.insertDataToDatabase(state.projectRefrence, newProject)

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

    const updateDataObject = {
      projectName: editedProject.projectName,
      featured: editedProject.featured,
      madeFor: editedProject.madeFor,
      categories: editedProject.categories,
      aboutProject: editedProject.aboutProject,
      date: editedProject.date,
      //images: editedProject.images,
      published: editedProject.published
    }
    FirebaseService.updateDatabase(firebaseConfigAPI.table + '/' + editedProject.id, updateDataObject)

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

    for (let i = 0; i < images[0].length; i++) {
      const imageFile = images[0][i];
      const storageRef = FirebaseService.getStorageReference(state.projectRefrence.key + '/' + imageFile.name)

      state.uploadedFilesNames.push(imageFile.name)

      uploadBytesResumable(storageRef, imageFile).on('state_changed', (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        state.uploadedFilesPercents[imageFile.name] = percentage
      })
    }
  },

  DELETE_IMAGE(state, imageName) {
    var filePath = state.projectRefrence.key + '/' + imageName
    FirebaseService.deleteProjectStorageImage(filePath)

    const projectIndex = state.uploadedFilesNames.findIndex(project =>
      project === imageName
    )

    state.uploadedFilesNames.splice(projectIndex, 1)
  },

  DELETE_IMAGES(state, images) {
    images.forEach(image => {
      var filePath = state.projectRefrence.key + '/' + image
      FirebaseService.deleteProjectStorageImage(filePath)
    });
  }
}