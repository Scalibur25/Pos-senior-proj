<template>
  <b-container>
    <div class="d-flex justify-content-center">
      <b-row>
        <b-col>
          <b-input v-model="text" placeholder="Enter your name"></b-input>
        </b-col>
        <b-col>
          <b-button variant="success" v-b-modal="'modalAddItemActive'">
            add
          </b-button>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <div class="d-flex justify-content-center flex-wrap">
        <b-card
          v-for="item in items"
          :key="item.id"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 18rem"
          class="m-1"
        >
          <b-card-title>
            {{ item.description }}
          </b-card-title>
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
            <b-button variant="warning">Edit</b-button>
          </b-button-group>
        </b-card>
      </div>
    </b-row>
    <b-modal id="modalAddItemActive" title="Add New Item" @ok="onSubmit">
      <div>
        <form ref="form">
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.description"
              type="text"
              placeholder="Enter Product Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Price:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.price"
              placeholder="Enter Price"
              type="number"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Cost:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.cost"
              placeholder="Enter Cost"
              type="number"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Unit:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.unit"
              type="text"
              placeholder="Enter Product Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Quantity:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              v-model="form.quantity"
              placeholder="Enter Quantity"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
        </form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </div>
    </b-modal>

    <b-modal id="modalEditItemActive" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </b-container>
</template>

<script>
import api from "@/apis";

export default {
  data() {
    return {
      items: [],
      modalAddItemActive: false,
      AddItem: {},
      modalEditItemActive: false,
      modalMessageActive: false,
      EditItem: {},
      text: null,
      form: {
        description: null,
        price: 0,
        cost: 0,
        unit: "THB",
        quantity: 0,
        status: "TEST",
      },
    };
  },
  methods: {
    async initPage() {
      await api
        .getItems()
        .then((result) => {
          this.items = [...result.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addItem() {
      await api
        .createItem(this.form)
        .then((result) => {
          this.items = [...result.data, result.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onSubmit(event) {
      this.form.description = String(this.form.description);
      this.form.price = parseFloat(this.form.price);
      this.form.cost = parseFloat(this.form.cost);
      this.form.quantity = parseFloat(this.form.quantity);
      this.form.unit = String(this.form.unit);

      event.preventDefault();
      this.addItem();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  created() {
    console.log(api);
    this.initPage();
  },
};
</script>

<style></style>
