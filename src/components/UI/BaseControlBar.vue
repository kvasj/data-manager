<template>
  <div class="control-bar">
    <slot name="left"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.control-bar {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
</style>