<template>
  <b-container>
    <div class="d-flex justify-content-end">
      <b-input v-model="text" placeholder="Enter your name"></b-input>
      <b-button variant="success" @click="modalAddItemActive = true">
        add
      </b-button>
    </div>
    <b-row>
      <div class="d-flex justify-content-center flex-wrap">
        <b-card
          v-for="item in items"
          :key="item.id"
          :img-src="item.pic"
          img-height="250"
          img-width="250"
          img-alt="Image"
          img-top
          tag="article"
          class="m-1"
        >
          <b-card-title>
            {{ item.name }}
          </b-card-title>
          <div class="col-sm col-xs-12">{{ item.description }}</div>
          <div class="col-sm col-xs-12">cost: {{ item.cost }} THB</div>
          <div class="col-sm col-xs-12">price: {{ item.price }} THB</div>
          <div class="col-sm col-xs-12">
            quantity: {{ item.quantity }} {{ item.unit }}
          </div>

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
          <b-card-text v-else>
            category:
            <b-button-group size="sm">
              <b-button variant="outline-info" size="sm" pill> ไม่มี </b-button>
            </b-button-group>
          </b-card-text>

          <template #footer>
            <b-button-group size="sm">
              <b-button @click="stockOn(item)" variant="primary"
                >Stock</b-button
              >
              <b-button @click="editOn(item)" variant="warning">Edit</b-button>
            </b-button-group>
          </template>
        </b-card>
      </div>
    </b-row>

    <!-- ADDITEM -->
    <b-modal v-model="modalAddItemActive" title="Add New Item" @ok="onSubmit">
      <div>
        <form ref="form">
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              placeholder="Enter Product Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-description"
            label="Description:"
            label-for="input-description"
          >
            <b-form-input
              id="input-description"
              v-model="form.description"
              placeholder="Enter Description"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-image" label="Image:" label-for="input-image">
            <b-form-input
              id="input-image"
              v-model="form.pic"
              placeholder="Enter Image url"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col cols="8" sm="6">
              <b-form-group
                id="input-group-2"
                label="Price:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.price"
                  placeholder="Enter Price"
                  type="number"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="8" sm="6">
              <b-form-group
                id="input-group-3"
                label="Cost:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.cost"
                  placeholder="Enter Cost"
                  type="number"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
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

          <b-form-group id="category" label="Category:" label-for="category">
            <b-form-select
              v-model="form.category"
              :options="
                categoryOption.map((e) => ({ value: e.id, text: e.name }))
              "
              class="mb-3"
            >
            </b-form-select>
          </b-form-group>
        </form>
      </div>
    </b-modal>

    <!-- Edit Item -->
    <b-modal
      v-model="modalEditItemActive"
      title="Edit item Detail"
      @ok="onEdit"
      @cancel="onCancelEdit"
    >
      <div>
        <form ref="form">
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              v-model="EditItem.name"
              type="text"
              placeholder="Enter Product Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-description"
            label="Description:"
            label-for="input-description"
          >
            <b-form-input
              id="input-description"
              v-model="EditItem.description"
              placeholder="Enter Description"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-image" label="image:" label-for="input-image">
            <b-form-input
              id="input-image"
              v-model="EditItem.pic"
              placeholder="Enter Image url"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col cols="8" sm="6"
              ><b-form-group
                id="input-group-2"
                label="Price:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="EditItem.price"
                  placeholder="Enter Price"
                  type="number"
                  required
                ></b-form-input> </b-form-group
            ></b-col>
            <b-col cols="4" sm="6"
              ><b-form-group
                id="input-group-3"
                label="Cost:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="EditItem.cost"
                  placeholder="Enter Cost"
                  type="number"
                  required
                ></b-form-input> </b-form-group
            ></b-col>
          </b-row>
          <b-form-group id="input-group-4" label="Unit:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="EditItem.unit"
              type="text"
              placeholder="Enter Product Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="category" label="Category:" label-for="category">
            <b-form-select
              multiple
              :select-size="1"
              v-model="EditItem.category"
              :options="
                categoryOption.map((e) => ({ value: e.id, text: e.name }))
              "
              class="mb-3"
            >
            </b-form-select>
          </b-form-group>
          {{ EditItem }}
        </form>
      </div>
    </b-modal>

    <!-- Stock Item  -->
    <b-modal
      v-model="modalStockItemActive"
      title="Edit Item Stock"
      @ok="onStock"
    >
      <b-form-input
        id="amount"
        type="number"
        v-model="StockItem.amount"
      ></b-form-input>
    </b-modal>
  </b-container>
</template>

<script>
import api from "@/apis";

export default {
  data() {
    return {
      items: [],
      categoryOption: [],
      modalAddItemActive: false,
      AddItem: {},
      modalEditItemActive: false,
      modalStockItemActive: false,
      modalMessageActive: false,
      EditItem: {},
      StockItem: {
        amount: 0,
      },
      text: null,
      form: {
        name: null,
        description: null,
        price: 0,
        cost: 0,
        unit: "ชิ้น",
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
      await api
        .getCategory()
        .then((result) => {
          this.categoryOption = [...result.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addItem() {
      await api
        .createItem({
          ...this.form,
          category: { connect: [{ id: this.form.category }] },
        })
        .then((result) => {
          result.status === 200
            ? (this.modalAddItemActive = false)
            : this.modalAddItemActive;
          this.items = [...this.items, result.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editOn(item) {
      console.log(item);
      this.EditItem = item;
      this.modalEditItemActive = true;
    },

    async stockOn(item) {
      this.StockItem = { ...this.StockItem, ...item };
      this.modalStockItemActive = true;
    },

    async onEdit() {
      const resp = await api
        .editItem(this.EditItem)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });

      const index = parseInt(
        this.items.findIndex((element) => element.id > resp.id)
      );
      this.items[index - 1] = resp.quantity;
    },

    async onStock() {
      const resp = await api
        .stockItem({
          itemId: this.StockItem.id,
          amount: parseInt(this.StockItem.amount),
        })
        .then((result) => {
          result.status === 200 ? this.onCancelStock() : this.StockItem;
          return result.data;
        })
        .catch((err) => {
          console.log(err);
        });
      const index = parseInt(
        this.items.findIndex((element) => element.id > resp.id)
      );
      this.items[index - 1].quantity = resp.quantity;
    },

    onCancelEdit() {
      this.EditItem = {};
    },

    onCancelStock() {
      this.StockItem = { amount: 0 };
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
