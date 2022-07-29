<template>
  <table>
    <tr>
      <th>Name</th>
      <th>Categories</th>
      <th>Featured</th>
      <th>Made for</th>
      <th>Year</th>
      <th>About project</th>
      <th>Actions</th>
    </tr>
    <tr v-for="i in 30" :key="i">
      <td>Hradec Kralove</td>
      <td>projekcni cinnost, vizualizace</td>
      <td>Q atelier</td>
      <td>mesto Hradec Kralove sro</td>
      <td>2022</td>
      <td>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</td>
      <td class="actions">
        <base-button mode='update'>
          <ion-icon name="create-outline"></ion-icon>
        </base-button>
        <base-button mode='delete'>
          <ion-icon name="trash-outline"></ion-icon>
        </base-button>
      </td>
    </tr>
  </table>
</template>

<script>


export default {};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-style: hidden;
  width: 100%;
  background-color: white;
  border-radius: 5px;  
  box-shadow: 0px 2px 15px rgba(100, 100, 111, 0.1);
}

td,
th {
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 60px;
}

td{
  word-wrap: break-word;
}

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.1);
}

.actions button:first-child{
  margin-left: 0px;
}
.actions button{
  margin-left: 15px;
}
</style>