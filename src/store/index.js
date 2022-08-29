import { createStore } from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default createStore({
  state: {    
    projects: [],
    categoryEnums: {
      interiers: 'interiéry',
      vizualization: 'vizualizace',
      designActivity: 'projekční činnost'
    },
    project: [],
    projectReference: null,
    searchText: "",
    showMessage: false,
    messageStatus: "",
    messageText: "",
    uploading: false,
    uploadedFilesNames: [],
    uploadedFilesPercents: [],
  },

  mutations,
  actions,
  getters,

  modules: {
  }
})