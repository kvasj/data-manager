<template>
  <div class="form-wrapper">
    <form @submit.prevent="submit">
      <div class="input-group">
        <span>project name:</span>
        <input type="text" id="name" name="name" v-model="project.projectName" />
      </div>

      <div class="group">
        <div class="input-group">
          <span>featured:</span>
          <input type="text" id="featured" name="featured" v-model="project.featured" />

        </div>

        <div class="input-group">
          <span>made for:</span>
          <input type="text" id="madeFor" name="madeFor" v-model="project.madeFor" />

        </div>

        <div class="input-group">
          <span>date:</span>
          <input type="date" id="date" name="date" v-model="project.date" min="2018-01-01"/>

        </div>
      </div>

      <div class="input-group">
        <span>about project:</span>
        <textarea type="text" id="aboutProject" name="aboutProject" v-model="project.aboutProject" />
      </div>

      <div class="input-group">
        <span>categories:</span>
        <div class="boxes">
          <div class="check">
            <input type="checkbox" name="interiers" id="interiers" v-model="interiers" :checked='isChecked(categoryEnums.interiers, project.categories)' />
            <label for="interiers">interiéry</label>
          </div>
          <div class="check">
            <input type="checkbox" name="designActivity" id="designActivity" v-model="designActivity" :checked='isChecked(categoryEnums.designActivity, project.categories)'/>
            <label for="designActivity">projekční činnost</label>
          </div>
          <div class="check">
            <input type="checkbox" name="vizualization" id="vizualization" v-model="vizualization" :checked='isChecked(categoryEnums.vizualization, project.categories)'/>
            <label for="vizualizationa">vizualizace</label>
          </div>
        </div>
      </div>

      <div class="input-group">
        <span>images:</span>
        <div class="images">
          <div class="image" v-for="imageData in project.images" :key="imageData[0]">
            <div class="actions">
              <base-button>
                <ion-icon name="star-outline"></ion-icon>
              </base-button>
              <base-button mode="title-image">
                <ion-icon name="star"></ion-icon>
              </base-button>
              <base-button mode="delete">
                <ion-icon name="close-outline"></ion-icon>
              </base-button>
            </div>
            <img :src="imageData[1]" :alt="imageData[0]" width="290" height="180">
          </div>
        </div>
      </div>

      <div class="input-group">
        <span>select images:</span>
        <input type="file" id="img" name="img" accept="image/*" multiple />
      </div>

      <base-button @click="editProject(project)" text="edit project" mode="update">
        <ion-icon name="push-outline"></ion-icon>
      </base-button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex"
import { useRoute } from "vue-router"
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const interiers = ref(null);
    const designActivity = ref(null);
    const vizualization = ref(null);

    const categoryEnums = store.getters.categoryEnums
    const project = reactive({
      id: '',
      projectName: '',
      categories: [],
      madeFor: '',
      featured: '',
      aboutProject: '',
      date: null,
      images: [],
      published: false
    });
    

    onMounted(()=>{
      const projectId = route.params.id;
      store.dispatch("getProjectById", projectId);
      const searchedProject = store.getters.getProject;

      console.log(searchedProject)

      project.id = projectId
      project.projectName = searchedProject.projectName,
      project.categories = searchedProject.categories,
      project.madeFor = searchedProject.madeFor,
      project.featured = searchedProject.featured,
      project.aboutProject = searchedProject.aboutProject,
      project.date = searchedProject.date,
      project.published = searchedProject.published
      project.images = searchedProject.images
      interiers.value = isChecked(categoryEnums.interiers, project.categories)
      designActivity.value = isChecked(categoryEnums.designActivity, project.categories)
      vizualization.value = isChecked(categoryEnums.vizualization, project.categories)
    })

    function isChecked(checkboxCategory, projectCategories){
      return projectCategories.includes(checkboxCategory)
    }

    function editProject(project){
      project.categories = getCategories(interiers, designActivity, vizualization)
      store.dispatch('editProject', project)
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
      project,
      interiers,
      designActivity,
      vizualization,
      categoryEnums,
      isChecked,
      editProject,
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

form {
  position: relative;
  width: 900px;
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
form > button {
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

.group > .input-group{
  width: 28%;
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

.images{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.image{
  position: relative;
}

.image .actions {
  position: absolute;
  z-index: 1000;
  width: 100%;
  top: 3px;
  right: 3px;
  display: flex;
  justify-content: flex-end;
}

.image button{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 2px;
}

button {
  width: 100%;
}
</style>