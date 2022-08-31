<template>
  <div class="form-wrapper">
    <form @submit.prevent="submit">
      <div class="input-group">
        <span>project name:</span>
        <input type="text" id="name" name="name" v-model="name" />
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

        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          multiple
          @change="uploadedFiles"
        />

        <div
          class="uploaded-files"
          v-for="file in uploadedFilesNames"
          :key="file"
        >
          <div class="uploaded-file">
            <span class="file-name">{{ file }}</span>
            <div class="actions">
              <base-button>
                <ion-icon name="star-outline"></ion-icon>
              </base-button>
              <base-button mode="title-image">
                <ion-icon name="star"></ion-icon>
              </base-button>
              <base-button mode="delete" @click="deleteImage(file)">
                <ion-icon name="close-outline"></ion-icon>
              </base-button>
            </div>
            <div
              class="progress-bar"
              :style="{ width: uploadedFilesPercents[file] + '%' }"
            ></div>
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
    const name = ref("");
    const featured = ref("");
    const madeFor = ref("");
    const date = ref("");
    const aboutProject = ref("");
    const interiers = ref(false);
    const designActivity = ref(false);
    const vizualization = ref(false);
    var allImageFiles = [];
    var currentlyUploadedImageFiles = [];

    const uploadedFilesPercents = computed(() => {
      return store.getters.uploadedFilesPercents;
    });

    const uploadedFilesNames = computed(() => {
      return store.getters.uploadedFilesNames;
    });

    function addNewProject() {
      const newProject = {
        name: name.value,
        featured: featured.value,
        madeFor: madeFor.value,
        date: date.value,
        aboutProject: aboutProject.value,
        categories: processCategories([interiers, designActivity, vizualization]),
        images: allImageFiles,
        published: false,
      };

      store.dispatch("addNewProject", newProject);
    }

    function processCategories(interiers, designActivity, vizualization) {
      let result = [];
      result.push([categoryEnums.interiers, interiers.value]);
      result.push([categoryEnums.designActivity, designActivity.value]);
      result.push([categoryEnums.vizualization, vizualization.value]);

      return result;
    }

    function deleteImage(imageName) {
      //TODO delete file image from images if uploaded image was deleted before add project
      const fileIndex = allImageFiles.findIndex((file) => {
        return file.name === imageName
      })
      allImageFiles.splice(fileIndex, 1)

      store.dispatch("deleteImage", {imageName: imageName, projectId: null});
    }

    function uploadedFiles(e) {
      var fileList = Array.from(e.target.files);
      allImageFiles = allImageFiles.concat(fileList)

      store.dispatch("uploadImages", fileList);
    }

    return {
      categoryEnums,
      name,
      featured,
      madeFor,
      date,
      aboutProject,
      interiers,
      designActivity,
      vizualization,
      allImageFiles,
      addNewProject,
      uploadedFiles,
      uploadedFilesPercents,
      uploadedFilesNames,
      deleteImage,
    };
  },
};
</script>

<style scoped>
.uploaded-files {
  display: flex;
  justify-content: space-between;
}
.uploaded-file {
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
.uploaded-file button {
  width: 30px;
  height: 30px;
  margin-left: 2px;
}
.uploaded-file .progress-bar {
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