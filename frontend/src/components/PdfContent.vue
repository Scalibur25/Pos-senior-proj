<template>
  <div class="">
    <div>{{ item.orderId }}</div>
  </div>
</template>
<script>
import api from "../apis";
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async initPage() {
      await api
        .getOrder()
        .then((result) => {
          this.items = [...result.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style></style>
