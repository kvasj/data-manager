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
    <tr v-for="p in projects" :key="p.id">
      <td>{{ p.projectName }}</td>
      <td>{{ getCategories(p.categories) }}</td>
      <td>{{ p.featured }}</td>
      <td>{{ p.madeFor }}</td>
      <td>{{ p.year }}</td>
      <td>{{ p.aboutProject }}</td>
      <td>
        <base-button @click="setPublicity(p.id)" mode="info" v-if="p.published">
          <ion-icon name="eye-outline"></ion-icon>
        </base-button>
        <base-button @click="setPublicity(p.id)" mode="info-dark" v-else>
          <ion-icon name="eye-off-outline"></ion-icon>
        </base-button>
      </td>
      <td class="actions">
        <base-button @click="editProject(p.id)" mode="update">
          <ion-icon name="create-outline"></ion-icon>
        </base-button>
        <base-button @click="deleteProject(p.id)" mode="delete">
          <ion-icon name="trash-outline"></ion-icon>
        </base-button>
      </td>
    </tr>
  </table>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';

export default {
  props: ['projects'],

  setup() {
    const router = useRouter();
    const store = useStore();

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

    function setPublicity(projectId) {
      store.dispatch("setPublicity", projectId);
    }

    function editProject(projectId) {
      router.push({ name: "editProject", params: { id: projectId } });
    }

    function deleteProject(projectId) {
      store.dispatch("deleteProject", projectId);
    }
    
    return {
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