<template>
  <div class="form-wrapper">
    <form @submit.prevent="submit">
      <div class="input-group">
        <span>project name:</span>
        <input type="text" id="name" name="name" v-model="project.projectName" />
        <span class="error"></span>
      </div>

      <div class="group">
        <div class="input-group">
          <span>featured:</span>
          <input type="text" id="featured" name="featured" v-model="project.featured" />
          <span class="error"></span>
        </div>

        <div class="input-group">
          <span>made for:</span>
          <input type="text" id="madeFor" name="madeFor" v-model="project.madeFor" />
          <span class="error"></span>
        </div>

        <div class="input-group">
          <span>year:</span>
          <input type="number" id="year" name="year" v-model="project.year" />
          <span class="error"></span>
        </div>
      </div>

      <div class="input-group">
        <span>about project:</span>
        <textarea type="text" id="aboutProject" name="aboutProject" v-model="project.aboutProject" />
        <span class="error"></span>
      </div>

      <div class="input-group">
        <span>categories:</span>
        <div class="boxes">
          <div class="check">
            <input type="checkbox" name="interiers" id="interiers" :checked='isChecked(categoryEnums.interiers, project.categories)' />
            <label for="interiers">interiéry</label>
          </div>
          <div class="check">
            <input type="checkbox" name="designActivity" id="designActivity" :checked='isChecked(categoryEnums.designActivity, project.categories)'/>
            <label for="designActivity">projekční činnost</label>
          </div>
          <div class="check">
            <input type="checkbox" name="vizualization" id="vizualization" :checked='isChecked(categoryEnums.vizualization, project.categories)'/>
            <label for="vizualizationa">vizualizace</label>
          </div>
        </div>
        <span class="error"></span>
      </div>

      <div class="input-group">
        <span>select images:</span>
        <input type="file" id="img" name="img" accept="image/*" multiple />
      </div>

      <div class="input-group">
        <span>photos:</span>
        
        <span class="error"></span>
      </div>

      <base-button text="edit project" mode="update">
        <ion-icon name="push-outline"></ion-icon>
      </base-button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex"
import { useRoute } from "vue-router"
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const categoryEnums = store.getters.categoryEnums
    const project = reactive({
      id: '',
      projectName: '',
      categories: [],
      madeFor: '',
      featured: '',
      aboutProject: '',
      year: null,
      photos: [],
      titlePhoto: '',
      published: false
    });
    

    onMounted(()=>{
      const projectId = route.params.id;
      const searchedProject = store.getters.projects.find((element) => { return projectId === element.id });

      project.id = searchedProject.projectId,
      project.projectName = searchedProject.projectName,
      project.categories = searchedProject.categories,
      project.madeFor = searchedProject.madeFor,
      project.featured = searchedProject.featured,
      project.aboutProject = searchedProject.aboutProject,
      project.year = searchedProject.year,
      project.photos = searchedProject.photos,
      project.titlePhoto = searchedProject.titlePhoto
      project.published = searchedProject.published
    })

    function isChecked(checkboxCategory, projectCategories){
      return projectCategories.includes(checkboxCategory)
    }
    
    return {
      project,
      categoryEnums,
      isChecked
    }
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