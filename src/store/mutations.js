import axios from 'axios'
import firebaseConfig from '../assets/firebase/config'

export default{
    SET_PROJECTS(state, projects) {
      for (const projectId in projects) {
        const project = Object.assign({ id: projectId }, projects[projectId])
        state.projects.push(project)
      }
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

      await axios.patch(firebaseConfig.URL + firebaseConfig.table + "/" + projectId + "/" + firebaseConfig.format, {
        published: !searchedProject.published
      }
      ).then((response) => {
        if (response.status === 200) {
          searchedProject.published = !searchedProject.published
        }
      })

    },

    async DELETE_PROJECT(state, projectId) {
      await axios.delete(firebaseConfig.URL + firebaseConfig.table + "/" + projectId + firebaseConfig.format
      ).then((response) => {
        if (response.status === 200) {
          const projectIndex = state.projects.findIndex(project => project.id === projectId)
          state.projects.splice(projectIndex, 1)

          state.showMessage = true
          state.messageStatus = "success"
          state.messageText = "Project was succesfully deleted."
        }
      })
    },

    async ADD_NEW_PROJECT(state, newProjectObject) {
      await axios.post(firebaseConfig.URL + firebaseConfig.table + firebaseConfig.format, {
        projectName: newProjectObject.projectName,
        featured: newProjectObject.featured,
        madeFor: newProjectObject.madeFor,
        categories: newProjectObject.categories,
        aboutProject: newProjectObject.aboutProject,
        date: newProjectObject.date,
        published: newProjectObject.published
      }).then((response) => {
        if (response.status === 200) {
          const projectId = response.data.name;
          const project = Object.assign({ id: projectId }, newProjectObject)
          state.projects.push(project)
          state.showMessage = true
          state.messageStatus = "success"
          state.messageText = "Project was succesfully created."
        }
      })
    },

    async EDIT_PROJECT(state, editedProject) {
      await axios.patch(firebaseConfig.URL + firebaseConfig.table + "/" + editedProject.id + "/" + firebaseConfig.format, {
        projectName: editedProject.projectName,
        featured: editedProject.featured,
        madeFor: editedProject.madeFor,
        categories: editedProject.categories,
        aboutProject: editedProject.aboutProject,
        date: editedProject.date,
        published: editedProject.published
      }
      ).then((response) => {
        if (response.status === 200) {
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
          state.messageText = "Project was succesfully edited."
        }
      })
    },

    SET_SEARCH_TEXT(state, searchText) {
      state.searchText = searchText;
    },

    SET_SHOW_MESSAGE(state, showMessageValue){
      state.showMessage = showMessageValue
    }
  }