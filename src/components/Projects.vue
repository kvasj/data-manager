<template>
  <line-list></line-list>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import LineList from './Lists/LineList.vue'
export default {
  components: {
    LineList
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchProjects');
    });
    return {};
  },
};
</script>