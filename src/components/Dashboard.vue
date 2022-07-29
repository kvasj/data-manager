<template>
  <div class="control-bar">
    <base-button text="success" mode="success">
      <span class="button-icon">
        <ion-icon name="checkmark-done-outline"></ion-icon>
      </span>
    </base-button>

    <base-button text="add project" mode="update">
      <span class="button-icon">
        <ion-icon name="add-outline"></ion-icon>
      </span>
    </base-button>

    <base-button text="delete" mode="delete">
      <span class="button-icon">
        <ion-icon name="close-outline"></ion-icon>
      </span>
    </base-button>
  </div>

  dashboard
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.control-bar {
  display: flex;
  justify-content: right;
  padding: 20px;
}

.control-bar button{
  margin-left: 15px;
}

.button-icon{
    display: inline-flex;
    align-items: center;
    padding: 0px 5px;
    height: 100%;
    font-size: 1.3em;
}

</style>