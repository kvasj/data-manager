<template>
  <table>
    <tr>
      <th>Name</th>
      <th>Categories</th>
      <th>Featured</th>
      <th>Made for</th>
      <th>Year</th>
      <th>About project</th>
      <th>Published</th>
      <th>Actions</th>
    </tr>
    <tr v-for="d in projects" :key="d.id">
      <td>{{ d.projectName }}</td>
      <td>{{ getCategories(d.categories) }}</td>
      <td>{{ d.featured }}</td>
      <td>{{ d.madeFor }}</td>
      <td>{{ d.year }}</td>
      <td>{{ d.aboutProject }}</td>
      <td>
        <base-button @click="setPublicity(d.id)" mode="success" v-if="d.published">
          <ion-icon name="checkmark-outline"></ion-icon>
        </base-button>
        <base-button @click="setPublicity(d.id)" mode="delete" v-else>
          <ion-icon name="close-outline"></ion-icon>
        </base-button>
      </td>
      <td class="actions">
        <base-button @click="editProject(d.id)" mode="update">
          <ion-icon name="create-outline"></ion-icon>
        </base-button>
        <base-button @click="deleteProject(d.id)" mode="delete">
          <ion-icon name="trash-outline"></ion-icon>
        </base-button>
      </td>
    </tr>
  </table>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const projects = computed(() => {
      return store.getters.projects;
    });

    function getCategories(categories) {
      let result = "";
      for (let c = 0; c < categories.length; c++) {
        if (c == categories.length - 1) {
          result += categories[c];
          return result
        } else {
          result += categories[c] + ", ";
        }
      }
      return result;
    }

    function setPublicity(id){
      store.dispatch('setPublicity', id)
    }

    function editProject(id){

    }

    function deleteProject(id){
      alert('Are you sure to delete this project?')
      store.dispatch('deleteProject', id)
    }

    return {
      projects,
      getCategories,
      setPublicity,
      editProject,
      deleteProject,
    };
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-style: hidden;
  width: 100%;
  background-color: white;
  border-radius: 5px;
}

td,
th {
  border: 1px solid #c3c3c3;
  text-align: center;
  height: 60px;
}

td {
  word-wrap: break-word;
}

tr:nth-child(even) {
  background-color: #e5e5e5;
}

.actions button:first-child {
  margin-left: 0px;
}
.actions button {
  margin-left: 15px;
}
</style>