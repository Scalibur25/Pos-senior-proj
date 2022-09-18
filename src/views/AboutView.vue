<template>
  <div class="bg">
    <b-card>
      <div>
        <span>Filter : </span>
        <b-dropdown text="Category">
          <b-form-input
            placeholder="Search Category"
            type="search"
          ></b-form-input>
          <b-form-checkbox-group>
            <b-form-checkbox value="orange">Orange</b-form-checkbox>
            <b-form-checkbox value="apple">Apple</b-form-checkbox>
          </b-form-checkbox-group>
        </b-dropdown>
      </div>

      <b-table striped hover :items="items"></b-table>
      <b-pagination-nav></b-pagination-nav>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { age: 40, first_name: "Sunga", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};
</script>

<style>
.bg {
  background-color: lightpink;
  height: 1000px;
}
</style>
