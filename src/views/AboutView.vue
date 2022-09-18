<template>
  <b-container>
    <div v-for="item in items" :key="item.id">
      <b-card
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-title>
          {{ item.description }}
        </b-card-title>
        <b-card-text> itemId: {{ item.id }}</b-card-text>
        <b-card-text> cost: {{ item.cost }} {{ item.unit }} </b-card-text>
        <b-card-text> price: {{ item.price }} {{ item.unit }} </b-card-text>
        <b-card-text v-if="item.category.length > 0">
          category:
          <b-button-group size="sm">
            <b-button
              variant="outline-info"
              size="sm"
              pill
              v-for="cate in item.category"
              :key="cate.id"
            >
              {{ cate.name }}
            </b-button>
          </b-button-group>
        </b-card-text>
        <b-button-group size="sm">
          <b-button href="#" variant="primary">Stock</b-button>
          <b-button href="#" variant="warning">Edit</b-button>
        </b-button-group>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import api from "@/apis";

export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async initPage() {
      await api
        .getItems()
        .then((result) => {
          this.items = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    console.log(api);
    this.initPage();
  },
};
</script>

<style>
.bg {
  background-color: lightpink;
  height: 1000px;
}
</style>
