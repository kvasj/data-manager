
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

    deleteProject({ commit, state }, projectId) {
        var images = [];
        var project = state.projects.filter(project => {
            return project.id === projectId
          })[0]
        project.images.forEach(image => {
            images.push(image[0])
        });
        commit('DELETE_IMAGES', images)
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

    deleteImage({commit}, image){
        commit('DELETE_IMAGE', image)
    }
}