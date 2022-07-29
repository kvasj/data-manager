<template>
  <form @submit.prevent="submit">
    <fieldset>
      <legend>Name</legend>
      <input type="text" id="name" name="name" placeholder="Project name..." />
    </fieldset>

    <fieldset for="featured">
      <legend>Featured</legend>
    <input type="text" id="featured" name="featured" placeholder="Featured with..."/>  
    </fieldset>
    

    <fieldset for="madeFor">
      <legend>Made for</legend>
      <input type="text" id="madeFor" name="madeFor" placeholder="Made for..." />
    </fieldset>
    

    <fieldset for="year">
      <legend>Year</legend>
      <input type="number" id="year" name="year" />
    </fieldset>
    

    <fieldset for="aboutProject">
      <legend>About project</legend>
      <textarea type="text" id="aboutProject" name="aboutProject" placeholder="Type something about project..."/>
    </fieldset>
    

    <fieldset class="checkbox-group">
      <legend>Categories:</legend>
      <input type="checkbox" name="interiers" id="interiers" />
      <label for="interiers">interiéry</label>
      <input type="checkbox" name="designActivity" id="designActivity" />
      <label for="designActivity">projekční činnost</label>
      <input type="checkbox" name="vizualizationa" id="vizualizationa" />
      <label for="vizualizationa">vizualizace</label>
    </fieldset>

    <base-button text="add project" mode="update">
      <ion-icon name="push-outline"></ion-icon>
    </base-button>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
input,
textarea,
label {
  width: 150px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

form {
  position: relative;
  width: 800px;
  height: 600px;
  margin: 0 auto;
  padding: 1em;
  box-sizing: border-box;

  /* we create our grid
  display: grid;
  grid-gap: 10px;*/
}

textarea {
  width: 500px;
  resize: vertical;
  padding: 15px;
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.06);
  height: 120px;
}
</style>