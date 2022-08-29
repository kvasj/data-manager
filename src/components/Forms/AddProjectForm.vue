<template>
  <div class="form-wrapper">
    <!-- {{ uploading }} -->
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
          <span>date:</span>
          <input
            type="date"
            id="date"
            name="date"
            v-model="date"
            min="2018-01-01"
          />
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

        <!-- v-on:change="images" -->
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          multiple
          @change="uploadedFiles"
        />

        <div class="uploaded-files" v-for="file in uploadedFilesNames " :key="file">
          <div class="uploaded-file">
            <span class="file-name">{{ file }}</span>
            <div class="actions">
              <base-button>
                <ion-icon name="star-outline"></ion-icon>
              </base-button>
              <base-button mode="title-image">
                <ion-icon name="star"></ion-icon>
              </base-button>
              <base-button mode="delete" @click="deleteUploadedImage(file)">
                <ion-icon name="close-outline"></ion-icon>
              </base-button>
            </div>
            <div class="progress-bar" :style="{'width':uploadedFilesPercents[file]+'%'}"></div>
          </div>
        </div>
      </div>

      <base-button @click="addNewProject" text="add project" mode="update">
        <ion-icon name="push-outline"></ion-icon>
      </base-button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const categoryEnums = store.getters.categoryEnums;
    const projectName = ref("");
    const featured = ref("");
    const madeFor = ref("");
    const date = ref(null);
    const aboutProject = ref("");
    const interiers = ref(null);
    const designActivity = ref(null);
    const vizualization = ref(null);
    var images = [];

    const uploading = computed(() => {
      return store.getters.uploading;
    }); 

    const uploadedFilesPercents = computed(() => {
      return store.getters.uploadedFilesPercents;
    });

    const uploadedFilesNames = computed(() => {
      return store.getters.uploadedFilesNames;
    });

    function addNewProject() {
      const newProject = {
        projectName: projectName.value,
        featured: featured.value,
        madeFor: madeFor.value,
        date: date.value,
        aboutProject: aboutProject.value,
        categories: getCategories(interiers, designActivity, vizualization),
        images: images,
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

    function deleteUploadedImage(imageName){
       alert(imageName)
    }

    function uploadedFiles(e) {
      images = [];
      images.push(e.target.files);

      store.dispatch("uploadImages", images);
    }

    return {
      categoryEnums,
      projectName,
      featured,
      madeFor,
      date,
      aboutProject,
      interiers,
      designActivity,
      vizualization,
      images,
      addNewProject,
      uploadedFiles,
      uploading,
      uploadedFilesPercents,
      uploadedFilesNames,
      deleteUploadedImage,
    };
  },
};
</script>

<style scoped>
.uploaded-files{
  display: flex;
  justify-content: space-between;
}
.uploaded-file{
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  height: 60px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 3px;
  justify-content: space-between;
}
.uploaded-file button{
  width: 30px;
  height: 30px;
  margin-left: 2px;
}
.uploaded-file .progress-bar{
  position: absolute;
  bottom: 0px;
  left: 0;
  height: 6px;
  background-color: #34c85a;
}


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

.input-group, form > button {
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