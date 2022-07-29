<template>
  <form @submit.prevent="submit">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Project name..." />

    <label for="featured">Featured</label>
    <input
      type="text"
      id="featured"
      name="featured"
      placeholder="Featured with..."
    />

    <label for="madeFor">Made for</label>
    <input type="text" id="madeFor" name="madeFor" placeholder="Made for..." />

    <label for="year">Year</label>
    <input type="number" id="year" name="year" />

    <label for="aboutProject">About project</label>
    <textarea
      type="text"
      id="aboutProject"
      name="aboutProject"
      placeholder="Project name..."
    />

    <label for="categories">Categories</label>
    <select id="categories" name="categories">
      <option value="interiers">interiéry</option>
      <option value="designs">projekční činnost</option>
      <option value="vizualizations">vizualizace</option>
    </select>

    <base-button text='add project' mode='update'>
        <ion-icon name="push-outline"></ion-icon>
    </base-button>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>

</style>