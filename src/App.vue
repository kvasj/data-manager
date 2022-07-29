<template>
  <div class="wrapper">
    <side-bar name="Qatelier"></side-bar>
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

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
  display: flex;
  flex: 2;
  height: 100vh;
  justify-content: center;
}
.container {
  width: 100%;
  margin: 50px 80px;
}
</style>
