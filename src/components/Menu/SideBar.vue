<template>
  <nav>
    <h1>{{ name }}</h1>
    <h4>Data Manager</h4>
    <div class="menu">
      <ul>
        <li>
          <span class="icon"><ion-icon name="grid-outline"></ion-icon></span>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <span class="icon"><ion-icon name="list-outline"></ion-icon></span>
          <router-link to="/projects">Projects</router-link>
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
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
  width: 150px;
  background: white;
  box-shadow: 0px 2px 15px rgba(100, 100, 111, 0.1);
}

h1 {
  margin-top: 20px;
}

.menu {
  margin-top: 20px;
}

.menu ul {
  padding: 0px;
}

.menu li {
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px 10px 10px 10px;
}

a {
  color: inherit;
  text-decoration: none;
}

.icon {
  height: 23px;
  font-size: 1.3em;
  margin-right: 12px;
}
</style>