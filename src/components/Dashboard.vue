<template>
  <div class="control-bar">
    <base-button text="success" icon="add-outline" mode="success">
      <span class="button-icon">
        <ion-icon name="add-outline"></ion-icon>
      </span>
    </base-button>

    <base-button text="add project" icon="add-outline" mode="update">
      <span class="button-icon">
        <ion-icon name="add-outline"></ion-icon>
      </span>
    </base-button>

    <base-button text="delete" icon="add-outline" mode="delete">
      <span class="button-icon">
        <ion-icon name="add-outline"></ion-icon>
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