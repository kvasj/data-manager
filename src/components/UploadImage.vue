<template>
  <input
    type="file"
    id="img"
    name="img"
    accept="image/*"
    multiple
    @change="uploadedFiles"
  />

  <div class="uploaded-files" v-for="file in uploadedFilesNames" :key="file">
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
</template>

<script>
import { computed, inject, watch } from "vue";
import { useStore } from "vuex";
export default {
  props: ['images'],

  setup(props) {
    var allImageFiles = [];
    var currentlyUploadedImageFiles = [];
    const store = useStore()

    const uploadedFilesPercents = computed(() => {
      return store.getters.uploadedFilesPercents;
    });

    const uploadedFilesNames = computed(() => {
      return store.getters.uploadedFilesNames;
    });

    function deleteImage(imageName, projectId) {
      const fileIndex = allImageFiles.findIndex((file) => {
        return file.name === imageName;
      });
      allImageFiles.splice(fileIndex, 1);

      store.dispatch("deleteImage", {
        imageName: imageName,
        projectId: projectId,
      });
    }

    function uploadedFiles(e) {
      var fileList = Array.from(e.target.files);
      allImageFiles = allImageFiles.concat(fileList);

      store.dispatch("uploadImages", fileList);
    }

    return {
      uploadedFilesPercents,
      uploadedFilesNames,
      deleteImage,
      uploadedFiles,
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
  overflow: hidden;
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
</style>