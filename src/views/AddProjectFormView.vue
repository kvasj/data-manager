<template>
  <!-- <add-project-form></add-project-form> -->
  <formes :project='newProject' @submitProject='addNewProject'></formes>
</template>

<script>
import { computed, onMounted, provide, reactive } from 'vue';
import { useStore } from 'vuex'
//import AddProjectForm from "../components/Forms/AddProjectForm.vue";
import Formes from "../components/Forms/Form.vue";
import Project from "../utils/project"


export default {
  components: {
    //AddProjectForm,
    Formes
  },

  setup() {
    const store = useStore()
    const newProject = new Project()

    function addNewProject(newProject){
      console.log(newProject)
      store.dispatch("addNewProject", newProject);
    }

    return {
      newProject,
      addNewProject
    };
  },
};
</script>