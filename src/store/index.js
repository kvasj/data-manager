import { createStore } from 'vuex'
import dataJSON from "../data.json";

export default createStore({
  state: {
    projectsData: dataJSON,
  },
  mutations: {
  },
  actions: {
  },
  getters:{
    projects(state){
      return state.projectsData;
    }
  },
  modules: {
  }
})
