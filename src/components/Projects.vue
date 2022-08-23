<template>
  <line-list :projects='projects'></line-list>
</template>

<script>
import LineList from './Lists/LineList.vue'
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  components: {
    LineList
  },

  setup() {
    const store = useStore();

    const projects = computed(() => {
      const projs = store.getters.projects

      if(store.getters.searchText == '')
        return projs;
      else {
        return projs.filter((prj) =>
          prj.projectName.includes(store.state.searchText)
        );
      }
    });

    return {
      projects
    };
  },
};
</script>