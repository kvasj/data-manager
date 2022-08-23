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
    searchText: "",
  },

  mutations: {
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
      }).then((response) => {
        if (response.status === 200) {
          const projectId = response.data.name;
          const project = Object.assign({ id: projectId }, newProjectObject)
          state.projects.push(project)
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
            state.projects[projectIndex].year = editedProjectData.year,
            state.projects[projectIndex].published = editedProjectData.published
        }
      })
    },

    SET_SEARCH_TEXT(state, searchText){
      state.searchText = searchText;
    },
  },

  actions: {
    async fetchProjects({ commit }) {
      try {
        await axios.get(firebaseConfig.URL + firebaseConfig.table + firebaseConfig.format)
          .then(response => {
            commit('SET_PROJECTS', response.data)
          }

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

    setSearchText({ commit }, searchText) {
      commit('SET_SEARCH_TEXT', searchText)
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