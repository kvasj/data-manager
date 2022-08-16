import { createStore } from 'vuex'
import dataJSON from "../data.json";

export default createStore({
  state: {
    projectsData: dataJSON,
    categoryEnums: {
      interiers: 'interiéry',
      vizualization: 'vizualizace',
      designActivity: 'projekční činnost'
    }
  },

  mutations: {
    setPublicity(state, id) {
      let project = state.projectsData.find((element) => { return id === element.id })
      project.published = !project.published;
    },

    deleteProject(state, id) {
      const index = state.projectsData.findIndex(element => { return id === element.id })
      state.projectsData.splice(index, 1)
    },

    addNewProject(state, newProjectObject){
      //console.log(newProjectObject.categories)
      //adding to database or JSON file
    }
  },

  actions: {
    setPublicity({ commit }, payloadId) {
      commit('setPublicity', payloadId)
    },

    deleteProject({ commit }, payloadId) {
      commit('deleteProject', payloadId)
    },

    addNewProject({ commit }, payloadNewProjectObject) {
      commit('addNewProject', payloadNewProjectObject)
    }
  },
  
  getters: {
    projects(state) {
      return state.projectsData;
    },

    categoryEnums(state) {
      return state.categoryEnums;
    }
  },

  modules: {
  }
})
