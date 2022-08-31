<template>
  <table>
    <tr>
      <th>Name</th>
      <th>Categories</th>
      <th>Featured</th>
      <th>Made for</th>
      <th>Date</th>
      <th>About project</th>
      <th>Published</th>
      <th>Actions</th>
    </tr>
    <tr v-for="project in projects" :key="project.id">
      <td>{{ project.name }}</td>
      <td>{{ getCategories(project.categories) }}</td>
      <td>{{ project.featured }}</td>
      <td>{{ project.madeFor }}</td>
      <td>{{ project.date }}</td>
      <td>{{ shorterText(project.aboutProject) }}</td>
      <td>
        <base-button @click="setPublicity(project.id)" mode="info" v-if="project.published">
          <ion-icon name="eye-outline"></ion-icon>
        </base-button>
        <base-button @click="setPublicity(project.id)" mode="info-dark" v-else>
          <ion-icon name="eye-off-outline"></ion-icon>
        </base-button>
      </td>
      <td class="actions">
        <base-button @click="editProject(project.id)" mode="update">
          <ion-icon name="create-outline"></ion-icon>
        </base-button>
        <base-button @click="deleteProject(project.id)" mode="delete">
          <ion-icon name="trash-outline"></ion-icon>
        </base-button>
      </td>
    </tr>
  </table>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  props: ["projects"],

  setup() {
    const router = useRouter();
    const store = useStore();

    function getCategories(categories) {
      let result = "";
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        if (category.status) {
          result += category.name + ", ";
        }
      }
      result = result.slice(0, -2)
      return result;
    }

    function shorterText(text) {
      return text.substring(0, 40) + "...";
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
      shorterText,
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