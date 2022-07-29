<template>
  <div class="wrapper">
    <side-bar name="Qatelier"></side-bar>
    <main>
      <base-control-bar>
        <base-button text="success" mode="success">
          <span class="button-icon">
            <ion-icon name="checkmark-done-outline"></ion-icon>
          </span>
        </base-button>

        <base-button text="add project" mode="update">
          <span class="button-icon">
            <ion-icon name="add-outline"></ion-icon>
          </span>
        </base-button>

        <base-button text="delete" mode="delete">
          <span class="button-icon">
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </base-button>
      </base-control-bar>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import BaseControlBar from "./components/BaseControlBar.vue";
import SideBar from "./components/SideBar.vue";

export default {
  components: {
    SideBar,
    BaseControlBar,
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: row wrap;
}

main {
  flex-wrap: wrap;
  flex: 2;
  max-height: 100vh;
  padding: 50px 80px;
}

.container {
  width: 100%;
  height: 730px;
  padding: 10px;
  overflow-y: scroll;
}

.control-bar button {
  margin-left: 15px;
}

.button-icon {
  display: inline-flex;
  align-items: center;
  padding: 0px 5px;
  height: 100%;
  font-size: 1.3em;
}
</style>
