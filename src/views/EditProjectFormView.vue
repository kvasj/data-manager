<template>
  <edit-project-form :project="searchedProject"></edit-project-form>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import EditProjectForm from "../components/Forms/EditProjectForm.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: {
    EditProjectForm,
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    var searchedProject = computed(() => {
      return store.getters.getProject;
    });

    onMounted(() => {
      const projectId = route.params.id;
      store.dispatch("getProjectById", projectId);
    });
    
    return {
      searchedProject,
    };
  },
};
</script>