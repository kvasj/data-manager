import axios from 'axios'
import firebaseConfig from '../assets/firebase/config'

export default {
    async fetchProjects({ commit }) {
        try {
            await axios.get(firebaseConfig.URL + firebaseConfig.table + firebaseConfig.format)
                .then(response => {
                    commit('SET_PROJECTS', response.data)
                })
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

    setShowMessage({ commit }, showMessageValue) {
        commit('SET_SHOW_MESSAGE', showMessageValue)
    },
}