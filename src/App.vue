<template>
  <div class="wrapper">
    <side-bar name="Qatelier"></side-bar>
    <main>
      <base-control-bar>
        <template #left>
          <div class="left">
            <base-search></base-search>
            <base-button text="A-Z">
              <ion-icon name="arrow-down-outline"></ion-icon>
            </base-button>
            <base-button text="Z-A">
              <ion-icon name="arrow-up-outline"></ion-icon>
            </base-button>
          </div>
        </template>

        <base-button text="add project" mode="success">
          <ion-icon name="add-outline"></ion-icon>
        </base-button>
      </base-control-bar>

      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from "./components/Menu/SideBar.vue";

export default {
  components: {
    SideBar,
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

.control-bar .left button {
  margin-left: 15px;
}

.left{
  display: flex;
}
</style>
