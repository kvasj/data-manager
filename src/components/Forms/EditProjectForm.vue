<template>
  <div class="form-wrapper">
    <form @submit.prevent="submit">
      <div class="input-group">
        <span>project name:</span>
        <input type="text" id="name" name="name" v-model="project.name" />
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
          <div class="check" v-for="(category, index) in project.categories" :key="index">
            <input type="checkbox" v-model="category.status" :checked='category.status' />
            <label for="interiers">{{ category.name }}</label>
          </div>
        </div>
      </div>

      <div class="input-group">
        <span>images:</span>
        <div class="images">
          <div class="image" v-for="(imageData, index) in project.images" :key="index">
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
            <img :src="imageData.url" :alt="imageData.name" width="290" height="180">
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
import { useStore } from 'vuex'

export default {
  props: ['project'],

  setup() {
    const store = useStore()

    function editProject(project){
      store.dispatch('editProject', project)
    }
    
    return {
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