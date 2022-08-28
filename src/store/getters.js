export default {
    projects(state) {
        return state.projects;
    },

    categoryEnums(state) {
        return state.categoryEnums;
    },

    getProject(state) {
        return state.project
    },

    searchText(state) {
        return state.searchText
    },

    showMessage(state) {
        return state.showMessage
    },

    messageStatus(state) {
        return state.messageStatus
    },

    messageText(state) {
        return state.messageText
    },

    uploading(state) {
        return state.uploading
    },
}