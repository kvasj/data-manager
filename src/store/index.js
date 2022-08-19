import { createStore } from 'vuex'
import axios from 'axios'
import firebaseConfig from '../assets/firebase/config'

export default createStore({
  state: {
    projects: [],
    categoryEnums: {
      interiers: 'interiéry',
      vizualization: 'vizualizace',
      designActivity: 'projekční činnost'
    },
    project: [],
  },

  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects
    },

    SET_PROJECT(state, projectId) {
      state.project = state.projects[projectId]
    },

    async SET_PUBLICITY(state, projectId) {
      const searchedProject = state.projects[projectId]
      await axios.patch(firebaseConfig.URL + firebaseConfig.table + "/" + projectId + "/" + firebaseConfig.format, {
        published: !searchedProject.published
      }
      ).then((response) => console.log(response.status + ": " + response.statusText))

      state.projects[projectId].published = !state.projects[projectId].published
    },

    async DELETE_PROJECT(state, projectId) {
      await axios.delete(firebaseConfig.URL + firebaseConfig.table + "/" + projectId + firebaseConfig.format
      ).then((response) => {
        if (response.status === 200) {
          delete state.projects[projectId]
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
        year: newProjectObject.year,
        published: newProjectObject.published
      }).then(function (response) {
        if(response.status === 200){
          //state.projects.push(newProjectObject)
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
        year: editedProject.year,
        published: editedProject.published
      }
      ).then((response) => console.log(response.status + ": " + response.statusText))
    },
  },

  actions: {
    async fetchProjects({ commit }) {
      try {
        await axios.get(firebaseConfig.URL + firebaseConfig.table + firebaseConfig.format)
          .then(response =>
            commit('SET_PROJECTS', response.data)
          )
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },

    setPublicity({ commit }, projectId) {
      commit('SET_PUBLICITY', projectId)
    },

    deleteProject({ commit }, projectId) {
      commit('DELETE_PROJECT', projectId)
    },

    addNewProject({ commit }, newProjectObject) {
      commit('ADD_NEW_PROJECT', newProjectObject)
    },

    editProject({ commit }, editedProject) {
      commit('EDIT_PROJECT', editedProject)
    },

    getProjectById({ commit }, projectId) {
      commit('SET_PROJECT', projectId)
    },
  },

  getters: {
    projects(state) {
      return state.projects;
    },

    categoryEnums(state) {
      return state.categoryEnums;
    },

    getProject(state) {
      return state.project
    },
  },

  modules: {
  }
})
