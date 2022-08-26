
export default {
    fetchProjects({ commit }) {
        commit('SET_PROJECTS')
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