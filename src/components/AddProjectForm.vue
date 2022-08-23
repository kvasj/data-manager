<template>
  <div class="form-wrapper">
    <form @submit.prevent="submit">
      <div class="input-group">
        <span>project name:</span>
        <input type="text" id="name" name="name" v-model="projectName" />
        <span class="error"></span>
      </div>

      <div class="group">
        <div class="input-group">
          <span>featured:</span>
          <input type="text" id="featured" name="featured" v-model="featured" />
          <span class="error"></span>
        </div>

        <div class="input-group">
          <span>made for:</span>
          <input type="text" id="madeFor" name="madeFor" v-model="madeFor" />
          <span class="error"></span>
        </div>

        <div class="input-group">
          <span>year:</span>
          <input type="date" id="year" name="year" v-model="year" min="2018-01-01"/>
          <span class="error"></span>
        </div>
      </div>

      <div class="input-group">
        <span>about project:</span>
        <textarea
          type="text"
          id="aboutProject"
          name="aboutProject"
          v-model="aboutProject"
        />
        <span class="error"></span>
      </div>

      <div class="input-group">
        <span>categories:</span>
        <div class="boxes">
          <div class="check">
            <input
              type="checkbox"
              :name="categoryEnums.interiers"
              :id="categoryEnums.interiers"
              v-model="interiers"
            />
            <label :for="categoryEnums.interiers">interiéry</label>
          </div>
          <div class="check">
            <input
              type="checkbox"
              :name="categoryEnums.designActivity"
              :id="categoryEnums.designActivity"
              v-model="designActivity"
            />
            <label :for="categoryEnums.designActivity">projekční činnost</label>
          </div>
          <div class="check">
            <input
              type="checkbox"
              :name="categoryEnums.vizualization"
              :id="categoryEnums.vizualization"
              v-model="vizualization"
            />
            <label :for="categoryEnums.vizualization">vizualizace</label>
          </div>
        </div>
        <span class="error"></span>
      </div>

      <div class="input-group">
        <span>select images:</span>

        <!-- v-on:change="photos" -->
        <input type="file" id="img" name="img" accept="image/*" multiple />
      </div>

      <base-button @click="addNewProject" text="add project" mode="update">
        <ion-icon name="push-outline"></ion-icon>
      </base-button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const categoryEnums = store.getters.categoryEnums;
    const projectName = ref("");
    const featured = ref("");
    const madeFor = ref("");
    const year = ref(null);
    const aboutProject = ref("");
    const interiers = ref(null);
    const designActivity = ref(null);
    const vizualization = ref(null);
    const photos = ref("");

    function addNewProject() {
      const newProject = {
        projectName: projectName.value,
        featured: featured.value,
        madeFor: madeFor.value,
        year: year.value,
        aboutProject: aboutProject.value,
        categories: getCategories(interiers, designActivity, vizualization),
        photos: photos,
        published: false,
      };
      store.dispatch("addNewProject", newProject);
    }

    function getCategories(interiers, designActivity, vizualization) {
      let result = [];

      if (interiers.value) {
        result.push(categoryEnums.interiers);
      }
      if (designActivity.value) {
        result.push(categoryEnums.designActivity);
      }
      if (vizualization.value) {
        result.push(categoryEnums.vizualization);
      }

      return result;
    }

    return {
      categoryEnums,
      projectName,
      featured,
      madeFor,
      year,
      aboutProject,
      interiers,
      designActivity,
      vizualization,
      photos,
      addNewProject,
    };
  },
};
</script>

<style scoped>
input,
textarea,
label {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: inherit;
}

input,
textarea {
  padding: 10px;
  font-size: 15px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

input:focus,
textarea:focus {
  border: 1px solid #ff9501;
}

.form-wrapper {
  display: flex;
  height: 100%;
}

form {
  position: relative;
  width: 600px;
  height: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  align-self: center;
}

textarea {
  width: 100%;
  resize: vertical;
  height: 120px;
}

.input-group,
button {
  margin-top: 15px;
}

.input-group > input {
  width: 100%;
  height: 40px;
}

.input-group > span {
  display: block;
  margin-bottom: 5px;
}

.group,
.boxes {
  display: flex;
  justify-content: space-between;
}

.check {
  display: flex;
  align-items: center;
}

.check > input {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

button {
  width: 100%;
}
</style>