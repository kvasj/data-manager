<template>
  <div class="flash-wrapper">
    <div class="flash-message" :class="status">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["status"],

  setup() {
    return {};
  },
};
</script>

<style scoped>
.flash-wrapper {
  position: fixed;
  top: 20px;
  width: 100%;
  z-index: 1000;
}

.flash-message {
  display: flex;
  margin: 0px auto;
  color: white;
  width: 400px;
  height: 80px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
}

.update {
  background-color: #ff9501;
  box-shadow: 0px 2px 8px rgba(255, 149, 1, 0.3);
}

.error {
  background-color: #ff3830;
  box-shadow: 0px 2px 8px rgba(255, 56, 48, 0.3);
}

.success {
  background-color: #34c85a;
  box-shadow: 0px 2px 8px rgba(52, 200, 90, 0.3);
}

.info {
  background-color: #006ee6; /* 006ee6 78C5EF */
  box-shadow: 0px 2px 8px rgba(0, 111, 230, 0.3);
}
</style>