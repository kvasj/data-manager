<template>
  <div class="search">
    <input
      id="search"
      type="text"
      placeholder="Search..."
      v-model="search"
      required
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const search = ref("");

    watch(() => {
      searchProject(search.value);
    });

    function searchProject(searchText) {
      store.dispatch("setSearchText", searchText);
    }

    return {
      search,
      searchProject
    };
  },
};
</script>

<style scoped>
.search {
  position: relative;
}

#search {
  height: 38px;
  padding: 0px 10px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: inherit;
  width: 250px;
}
</style>