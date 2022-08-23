<template>
  <div class="cards">
    <base-card
      v-for="p in projects"
      :key="p.id"
      :projectName="p.projectName"
      :categories="getCategories(p.categories)"
      @click="editProject(p.id)"
    ></base-card>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

export default {
  props: ['projects'],

  setup() {
    const router = useRouter()
    const store = useStore();
    
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

    function editProject(projectId) {
      router.push({ name: "editProject", params: { id: projectId } });
    }

    return {
      getCategories,
      editProject
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