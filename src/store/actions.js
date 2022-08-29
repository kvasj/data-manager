
export default {
    fetchProjects({ commit }) {
        commit('SET_PROJECTS')
    },

    addNewProject({ commit }, newProjectObject) {
        commit('ADD_NEW_PROJECT', newProjectObject)
    },

    uploadImages({ commit }, images) {
        commit('UPLOAD_IMAGES', images)
    },

    editProject({ commit }, editedProject) {
        commit('EDIT_PROJECT', editedProject)
    },

    deleteProject({ commit }, projectId) {
        commit('DELETE_PROJECT', projectId)
    },

    getProjectById({ commit }, projectId) {
        commit('SET_PROJECT', projectId)
    },

    setPublicity({ commit }, projectId) {
        commit('SET_PUBLICITY', projectId)
    },

    setSearchText({ commit }, searchText) {
        commit('SET_SEARCH_TEXT', searchText)
    },

    setShowMessage({ commit }, showMessageValue) {
        commit('SET_SHOW_MESSAGE', showMessageValue)
    },
}