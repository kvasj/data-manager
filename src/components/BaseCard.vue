<template>
  <div class="card">
    <div class="image"></div>
    <div class="content">
      <h3>Nazev projektu</h3>
      <span>projekcni cinnost, vizualizace</span>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
  width: 280px;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 2px 15px rgba(100, 100, 111, 0.1);
  margin: 11px;
  transition: 0.3s;
}

.card:hover{
  transform: translateY(-2px);
}

.image{
  width: 100%;
  height: 150px;
  background-color: brown;
}

h3{
  font-weight: 500;
  margin-bottom: 5px;
}

.content{
  text-align: center;
  padding: 15px;
}
</style>