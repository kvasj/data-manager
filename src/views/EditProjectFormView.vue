<template>
  <!-- <edit-project-form :project="searchedProject"></edit-project-form> -->
  <formes :project="searchedProject" @submitProject='editProject'></formes>
</template>

<script>
//import EditProjectForm from "../components/Forms/EditProjectForm.vue";
import Formes from "../components/Forms/Form.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: {
    //EditProjectForm,
    Formes
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    var searchedProject = computed(() => {
      return store.getters.project;
    });

    onMounted(() => {
      const projectId = route.params.id;
      store.dispatch("setProject", projectId);
    });

    function editProject(){
      console.log(searchedProject.value)
      store.dispatch('editProject', searchedProject.value)
    }
    
    return {
      searchedProject,
      editProject,
    };
  },
};
</script>