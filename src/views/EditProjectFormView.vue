<template>
{{searchedProject}}
  <formular :project="searchedProject" @submitProject='editProject' :isEditingProject='true'></formular>
</template>

<script>
import Formular from "../components/Forms/Form.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    Formular
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    var searchedProject = computed(() => {
      return store.getters.project;
    });

    onMounted(() => {
      const projectId = route.params.id;
      store.dispatch("setProject", projectId);
    });

    function editProject(projectPayload){
      store.dispatch('editProject', projectPayload)
      router.push('/projects')
    }
    
    return {
      searchedProject,
      editProject,
    };
  },
};
</script>