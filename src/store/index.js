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
    lastSearchedProject: [],
  },

  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects
    },

    SET_LAST_SEARCHED_PROJECT(state, projectId) {
      state.lastSearchedProject = state.projects[projectId]
    },

    SET_PUBLICITY(state, id) {
      //let project = state.projectsData.find((element) => { return id === element.id })
      //project.published = !project.published;
    },

    DELETE_PROJECT(state, id) {
      //const index = state.projectsData.findIndex(element => { return id === element.id })
      //state.projectsData.splice(index, 1)
    },

    ADD_NEW_PROJECT(state, newProjectObject) {
      axios.post(firebaseConfig.URL + firebaseConfig.table + firebaseConfig.format, {
        projectName: newProjectObject.projectName,
        featured: newProjectObject.featured,
        madeFor: newProjectObject.madeFor,
        categories: newProjectObject.categories,
        aboutProject: newProjectObject.aboutProject,
        year: newProjectObject.year,
        published: newProjectObject.published
      }).then(function (response) {
        console.log(response.status + ": " + response.statusText)
      })
    },

    EDIT_PROJECT(state, editedProject) {
      console.log(editedProject.categories)
      axios.patch(firebaseConfig.URL + firebaseConfig.table + "/" + editedProject.id + "/" + firebaseConfig.format, {
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
    fetchProjects({ commit }) {
      try {
        axios.get(firebaseConfig.URL + firebaseConfig.table + firebaseConfig.format).then(response => commit('SET_PROJECTS', response.data))
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
      commit('SET_LAST_SEARCHED_PROJECT', projectId)
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
      return state.lastSearchedProject
    },
  },

  modules: {
  }
})
