<template>
  <div class="pt-4 px-5">
    <b-row class="search-bar d-flex align-items-center pb-2">
      <b-col cols="8">
        <b-input-group>
          <b-form-input type="search" placeholder="Search"></b-form-input>
          <b-button>
            <span class="d-flex align-self-center material-icons md-24"
              >search</span
            >
          </b-button>
        </b-input-group>
      </b-col>
      <b-col cols="4">
        <!-- <span class="d-none d-xl-inline">Filter:</span> -->
        <span>Filter:</span>
        <b-dropdown id="dropdown-category" text="Category" class="m-md-2">
          <b-dropdown-item>category1</b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          bordered
          sticky-header
          select-mode="single"
          head-variant="secondary"
          hover
          :items="itemsOption"
          selectable
          @row-selected="onRowSelected"
          :fields="[
            { key: 'orderId', label: 'Bill' },
            { key: 'createAt', label: 'Date' },
          ]"
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #table-caption>caption is here naka</template>
          <template #cell(Order-Details)></template>
        </b-table>
      </b-col>
      <b-col>
        <b-row
          ><b-col>orderId: {{ selected.orderId }}</b-col
          ><b-col>data: {{ toDateString(selected.createAt) }}</b-col>
        </b-row>
        <b-row><b-col>itemList:</b-col><b-col>price:</b-col> </b-row>
        <b-row v-for="item in selected.itemList" :key="item.id">
          <b-col>{{ item.quantity }} x {{ item.Item.name }}</b-col
          ><b-col>{{ item.quantity * item.price }}</b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import api from "../apis";
export default {
  data() {
    return {
      selected: {},
      items: [
        // { age: 21, first_name: "Larsen", last_name: "Shaw" },
        // { age: 89, first_name: "Geneva", last_name: "Wilson" },
        // { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
  computed: {
    itemsOption() {
      return this.items.map((e) => {
        const dd = new Date(e.createAt);
        return {
          orderId: e.orderId,
          createAt: `
          ${dd.getDate() > 9 ? dd.getDate() : "0" + dd.getDate()}/${
            dd.getMonth() + 1 > 9
              ? dd.getMonth() + 1
              : "0" + (dd.getMonth() + 1)
          }/${dd.getFullYear()} 
          ${dd.getHours() > 9 ? dd.getHours() : "0" + dd.getHours()}:${
            dd.getMinutes() > 9 ? dd.getMinutes() : "0" + dd.getMinutes()
          }:${dd.getSeconds() > 9 ? dd.getSeconds() : "0" + dd.getSeconds()}`,
        };
      });
    },
  },
  methods: {
    toDateString(date) {
      const dd = new Date(date);
      return `
          ${dd.getDate() > 9 ? dd.getDate() : "0" + dd.getDate()}/${
        dd.getMonth() + 1 > 9 ? dd.getMonth() + 1 : "0" + (dd.getMonth() + 1)
      }/${dd.getFullYear()} 
          ${dd.getHours() > 9 ? dd.getHours() : "0" + dd.getHours()}:${
        dd.getMinutes() > 9 ? dd.getMinutes() : "0" + dd.getMinutes()
      }:${dd.getSeconds() > 9 ? dd.getSeconds() : "0" + dd.getSeconds()}`;
    },
    onRowSelected(items) {
      const id = items[0].orderId;
      this.selected = this.items.filter((e) => {
        console.log(e);
        return e.orderId == id;
      })[0];
      console.log(this.selected);
    },
    async initPage() {
      await api
        .getOrder()
        .then((result) => {
          console.log(result);
          this.selected = result.data[0];
          this.items = [...result.data];
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
.table-bg {
  background-color: white;
  height: 100%;
}
</style>
