<template>
  <div class="search">
    <input id="search" type="text" placeholder="Search..." autofocus required />
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
.search {
  position: relative;
}

#search {
  height: 38px;
  padding: 0px 10px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: inherit;
  width: 250px;
}
</style>