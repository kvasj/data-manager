<template>
  <formular :project='newProject' @submitProject='addNewProject'></formular>
</template>

<script>
import { computed, onMounted, provide, reactive } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Formular from "../components/Forms/Form.vue";
import Project from "../utils/project"


export default {
  components: {
    Formular
  },

  setup() {
    const store = useStore()
    const router = useRouter()
    const newProject = new Project()

    function addNewProject(newProjectPayload){
      store.dispatch("addNewProject", newProjectPayload);
      router.push('/projects')
    }

    return {
      newProject,
      addNewProject
    };
  },
};
</script>