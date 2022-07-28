<template>
  <nav>
    <h1>{{ name }}</h1>
    <h4>Data Manager</h4>
    <div class="menu">
      <ul>
        <li>
          <span class="icon"><ion-icon name="grid-outline"></ion-icon></span>
          <span>Dashboard</span>
        </li>
        <li>
          <span class="icon"><ion-icon name="list-outline"></ion-icon></span>
          <span>Projects</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 100vh;
  background: white;
  box-shadow: 0px 2px 15px rgba(100, 100, 111, 0.1);
}

h1 {
  margin-top: 20px;
}

.menu {
  margin-top: 40px;
}

.menu ul {
  padding: 0px;
}

.menu li {
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.icon {
  height: 23px;
  font-size: 1.3em;
  margin-right: 12px;
}
</style>