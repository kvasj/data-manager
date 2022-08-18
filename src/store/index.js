import { createStore } from 'vuex'
//import dataJSON from "../data.json"
import axios from 'axios'
import firebaseConfig from '../assets/firebase/config'

export default createStore({
  state: {
    projects: [],
    categoryEnums: {
      interiers: 'interiéry',
      vizualization: 'vizualizace',
      designActivity: 'projekční činnost'
    }
  },

  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects
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
      axios.post(firebaseConfig.URL + "projects.json", {
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
  },

  actions: {
    fetchProjects({ commit }) {
      try {
        axios.get(firebaseConfig.URL + "projects.json").then(response => commit('SET_PROJECTS', response.data))
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },

    setPublicity({ commit }, payloadId) {
      commit('SET_PUBLICITY', payloadId)
    },

    deleteProject({ commit }, payloadId) {
      commit('DELETE_PROJECT', payloadId)
    },

    addNewProject({ commit }, payloadNewProjectObject) {
      commit('ADD_NEW_PROJECT', payloadNewProjectObject)
    }
  },

  getters: {
    projects(state) {
      return state.projects;
    },

    categoryEnums(state) {
      return state.categoryEnums;
    }
  },

  modules: {
  }
})
