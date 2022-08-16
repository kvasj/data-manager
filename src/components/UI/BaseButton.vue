<template>
  <button :class="mode">
    <span class="button-icon">
      <slot></slot>
    </span>
    <span v-if="text" class="button-text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: ["text", "icon", "mode"],
  setup() {
    return {};
  },
};
</script>

<style scoped>
button {
  display: inline-flex;
  justify-content: center;
  height: 40px;
  font-size: 15px;
  font-family: inherit;
  border: none;
  outline: none;
  overflow: hidden;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.button-text {
  display: inline-flex;
  align-items: center;
  padding: 0px 5px;
  height: 100%;
}

.button-icon {
  display: inline-flex;
  align-items: center;
  padding: 0px 5px;
  height: 100%;
  font-size: 1.3em;
}

button:hover {
  box-shadow: 0px 2px 15px rgba(100, 100, 111, 0.1);
}

.update {
  background-color: #ff9501;
  color: white;
}

.update:hover {
  box-shadow: 0px 2px 8px rgba(255, 149, 1, 0.3);
}

.delete {
  background-color: #ff3830;
  color: white;
}

.delete:hover {
  box-shadow: 0px 2px 8px rgba(255, 56, 48, 0.3);
}

.success {
  background-color: #34c85a;
  color: white;
}

.success:hover {
  box-shadow: 0px 2px 8px rgba(52, 200, 90, 0.3);
}

.info {
  background-color: #006ee6; /* 006ee6 78C5EF */
  color: white;
}

.info:hover {
  box-shadow: 0px 2px 8px rgba(0, 111, 230, 0.3);
}

.info-dark{
  background-color: #000c19;
  color: white;
}

.info-dark:hover {
  box-shadow: 0px 2px 8px rgba(0, 12, 25, 0.3);
}
</style>