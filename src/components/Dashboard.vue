<template>
    <card-list :projects='projects'></card-list>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CardList from "./Lists/CardList.vue";

export default {
  components: {
    CardList,
  },

  setup() {
    const store = useStore();

    const projects = computed(() => {
      const projs = store.getters.projects

      if(store.state.searchText == '')
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