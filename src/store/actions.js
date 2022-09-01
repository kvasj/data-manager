
export default {
    fetchProjects({ commit }) {
        commit('SET_PROJECTS')
    },

    addNewProject({ commit }, newProjectPayload) {
        commit('ADD_NEW_PROJECT', newProjectPayload)
    },

    editProject({ commit }, editedProjectPayload) {
        commit('EDIT_PROJECT', editedProjectPayload)
    },

    deleteProject({ commit }, projectId) {
        commit('DELETE_PROJECT', projectId)
    },

    setProject({ commit }, projectId) {
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

    uploadImages({ commit }, payload) {
        commit('UPLOAD_IMAGES', payload)
    },

    deleteImage({commit}, payload){
        commit('DELETE_IMAGE', payload)
    }
}