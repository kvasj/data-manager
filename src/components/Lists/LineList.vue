<template>
  <table>
    <tr>
      <th>Name</th>
      <th>Categories</th>
      <th>Featured</th>
      <th>Made for</th>
      <th>Year</th>
      <th>About project</th>
      <th>Published</th>
      <th>Actions</th>
    </tr>
    <tr v-for="i in 15" :key="i">
      <td>Hradec Kralove</td>
      <td>projekcni cinnost, vizualizace</td>
      <td>Q atelier</td>
      <td>mesto Hradec Kralove sro</td>
      <td>2022</td>
      <td>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</td>
      <td>
        <base-button mode="success"  v-if="i%3 != 0">
          <ion-icon name="checkmark-outline"></ion-icon>
        </base-button>
        <base-button mode="delete" v-else>
          <ion-icon name="close-outline"></ion-icon>
        </base-button>
      </td>
      <td class="actions">
        <base-button mode="update">
          <ion-icon name="create-outline"></ion-icon>
        </base-button>
        <base-button mode="delete">
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
}

td,
th {
  border: 1px solid #c3c3c3;
  text-align: center;
  height: 60px;
}

td {
  word-wrap: break-word;
}

tr:nth-child(even) {
  background-color: #e5e5e5;
}

.actions button:first-child {
  margin-left: 0px;
}
.actions button {
  margin-left: 15px;
}
</style>