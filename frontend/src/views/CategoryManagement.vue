<template>
  <div class="pt-4 px-5">
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import api from "../apis";

export default {
  data() {
    return {
      fields: ["name", "description", "count"],
      items: [],
    };
  },
  methods: {
    async initPage() {
      await api
        .getCategory()
        .then((result) => {
          console.log(result);
          this.items = result.data.map((e) => {
            const v = e;
            console.log(e);
            v.count = e._count.item;
            return v;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.initPage();
  },
};
</script>

<style>
.search-bar {
  position: sticky;
  top: 120px;
  /* background-color: #f5f5f5; */
  z-index: 2;
}

.menu {
  z-index: 1;
  max-width: 1000px;
}

.menu--b-card {
  margin: 6px;
  /* width: 14rem; */
  max-width: 20rem;
}

.m-r-10 {
  margin-right: 10px;
}

.m-r-5 {
  margin-right: 5px;
}

.col--2 {
  position: fixed;
  right: 50px;
}

.item-list {
  /* margin-top: 6px; */
  height: 350px;
  background-color: white;
  position: sticky;
  top: 190px;
  overflow-y: auto;
}

.item-list--child {
  padding: 10px;
  width: 100%;
}

.buttons--submit {
  height: 60px;
  width: 100%;
}

.bold {
  font-weight: bold;
}

.bigger {
  font-size: 1.25em;
}

.input-group {
  margin-right: 30px;
}

.input-group button {
  border: none;
}
</style>
