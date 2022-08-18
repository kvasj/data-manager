<template>
  <div class="cards">
    <base-card
      v-for="p in projects"
      :key="i"
      :projectName="p.projectName"
      :categories="getCategories(p.categories)"
    ></base-card>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    
    onMounted(() => {
      store.dispatch("fetchProjects");
    });
    
    const projects = computed(() => {
      return store.getters.projects;
    });

    function getCategories(categories) {
      let result = "";
      for (let c = 0; c < categories.length; c++) {
        if (c == categories.length - 1) {
          result += categories[c];
          return result;
        } else {
          result += categories[c] + ", ";
        }
      }
      return result;
    }

    return {
      projects,
      getCategories,
    };
  },
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>