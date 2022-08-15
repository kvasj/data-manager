<template>
  <div class="cards">
    <base-card v-for="i in 3" :key="i"></base-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>