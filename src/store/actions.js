
export default {
    fetchProjects({ commit }) {
        commit('SET_PROJECTS')
    },

    addNewProject({ commit }, newProjectObject) {
        commit('ADD_NEW_PROJECT', newProjectObject)
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

    uploadImages({ commit }, images) {
        commit('UPLOAD_IMAGES', images)
    },

    deleteImage({commit}, payload){
        commit('DELETE_IMAGE', payload)
    }
}