<template>
  <div>
    <!-- SEARCH BAR start -->
    <div class="pt-4 px-5">
      <b-row class="search-bar d-flex align-items-center mb-4">
        <b-button variant="success" @click="modalAddItemActive = true">
          Add Item</b-button
        >
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
        <div>Filter:</div>

        <b-col>
          <b-form-select
            v-model="filtering"
            :options="
              categoryOption.map((e) => ({ value: e.id, text: e.name }))
            "
            >{{ filtering.name }}</b-form-select
          >
        </b-col>
      </b-row>
    </div>
    <!-- SEARCH BAR end -->

    <div id="body" class="mx-3">
      <div id="item-menu" class="d-flex justify-content-start flex-wrap">
        <b-card
          v-for="item in items"
          :key="item.id"
          :img-src="item.pic"
          :img-alt="item.pic"
          img-height="190"
          img-width="350"
          img-top
          tag="article"
          class="item-card m-1"
          @click="itemPreviewOn(item)"
        >
          <!-- <b-card-img class="card-hover"></b-card-img> -->
          <!-- @click="() => {viewItemDetailActive = !viewItemDetailActive;}" -->
          <!-- @click="expandOn(item)" -->
          <b-card-title class="text-truncate">
            {{ item.name }}
          </b-card-title>
          <!-- MINIMIZED view of item card (summary)-->
          <b-row>
            <b-col cols="4">
              <div>Price:</div>
              <div>In-stock:</div>
              <div>Status:</div>
            </b-col>
            <b-col cols="8">
              <div>THB {{ item.price }} / {{ item.unit }}</div>
              <div>{{ item.quantity }}</div>
              <div>
                <b-icon
                  v-if="item.status"
                  variant="success"
                  icon="circle-fill"
                  font-scale="0.7"
                ></b-icon>
                <b-icon v-else icon="circle-fill" font-scale="0.7"></b-icon>
                <span v-if="item.status" class="ml-1">Available</span>
                <span v-else class="ml-1">Not available</span>
              </div>
            </b-col>
          </b-row>

          <!-- EXPANDED view of item card (full details)-->

          <!-- <b-row v-else class="mb-3">
            <b-col id="item-card--left" cols="4">
              <div>Price:</div>
              <div>Cost:</div>
              <div>In-stock:</div>
              <div>Status:</div>
              <div>Category:</div>
              <div>Note:</div>
            </b-col>
            <b-col id="item-card--right" cols="8">
              <div>THB {{ item.price }} / {{ item.unit }}</div>
              <div>THB {{ item.cost }} / {{ item.unit }}</div>
              <div>{{ item.quantity }}</div>
              <div>
                <b-icon
                  v-if="item.status"
                  variant="success"
                  icon="circle-fill"
                  font-scale="0.7"
                ></b-icon>
                <b-icon v-else icon="circle-fill" font-scale="0.7"></b-icon>
                <span v-if="item.status" class="ml-1">Available</span>
                <span v-else class="ml-1">Not available</span>
              </div>
              <div v-for="cate in item.category" :key="cate.id">
                {{ cate.name }}
              </div>
              <div>{{ item.description }}</div>
            </b-col>
          </b-row> -->

          <!-- <div class="button--link mb-2">Click for more details</div> -->

          <div class="mt-3">
            <b-button
              @click="stockOn(item)"
              variant="primary"
              size="sm"
              class="item-btn--stock mr-1"
              >Add Stock</b-button
            >
          </div>
        </b-card>
      </div>

      <!-- VIEW ITEM -->
      <div id="item-preview">
        <img class="item-preview--img" :src="selected.pic" />

        <div class="item-preview--content mx-5">
          <div class="big my-3">{{ selected.name }}</div>
          <b-row>
            <b-col id="item-card--left" cols="3">
              <div>Price:</div>
              <div>Cost:</div>
              <div>In-stock:</div>
              <div>Status:</div>
              <div>Category:</div>
              <div>Note:</div>
            </b-col>
            <b-col id="item-card--right" cols="8">
              <div>THB {{ selected.price }} / {{ selected.unit }}</div>
              <div>THB {{ selected.cost }} / {{ selected.unit }}</div>
              <div>{{ selected.quantity }}</div>
              <div>
                <b-icon
                  v-if="selected.status"
                  variant="success"
                  icon="circle-fill"
                  font-scale="0.7"
                ></b-icon>
                <b-icon v-else icon="circle-fill" font-scale="0.7"></b-icon>
                <span v-if="selected.status" class="ml-1">Available</span>
                <span v-else class="ml-1">Not available</span>
              </div>
              <div v-for="cate in selected.category" :key="cate.id">
                {{ cate.name }}
              </div>
              <div>{{ selected.description }}</div>
            </b-col>
          </b-row>
        </div>
        <div class="item-preivew--btn m-3 d-flex justify-content-end">
          <b-button
            @click="editOn(selected)"
            variant="warning"
            size="sm"
            class="item-btn-mini mr-1"
            >Edit</b-button
          >
          <b-button
            @click="deleteOn(selected)"
            variant="danger"
            size="sm"
            class="item-btn-mini"
            >Delete</b-button
          >
        </div>
      </div>
    </div>

    <!-- <b-button @click="editOn(item)" variant="warning">Edit</b-button> -->

    <!-- ADD ITEM -->
    <b-modal v-model="modalAddItemActive" title="Add New Item" @ok="onSubmit">
      <div>
        <form ref="form">
          <b-form-group id="input-image" label="Image" label-for="input-image">
            <b-form-input
              id="input-image"
              v-model="form.pic"
              placeholder="Enter Image url"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-name" label="Name" label-for="input-1">
            <b-form-input
              id="input-name"
              v-model="form.name"
              type="text"
              placeholder="Enter Product Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group
                id="input-group-2"
                label="Price"
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
            <b-col>
              <b-form-group id="input-group-3" label="Cost" label-for="input-3">
                <b-form-input
                  id="input-3"
                  v-model="form.cost"
                  placeholder="Enter Cost"
                  type="number"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group id="input-group-5" label="Quantity" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="form.quantity"
              placeholder="Enter Quantity"
              type="number"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Unit" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.unit"
              type="text"
              placeholder="Enter Product Unit"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="category" label="Category" label-for="category">
            <b-form-select
              v-model="form.category"
              :options="
                categoryOption.map((e) => ({ value: e.id, text: e.name }))
              "
            >
            </b-form-select>
          </b-form-group>

          <b-form-group
            id="input-description"
            label="Description"
            label-for="input-description"
          >
            <b-form-textarea
              id="input-description"
              v-model="form.description"
              placeholder="Enter Description"
              rows="5"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            id="input-group-status"
            class="d-flex align-items-center"
            label="Status"
            label-for="input-status"
            label-cols="2"
          >
            <b-form-checkbox id="input-status" v-model="form.status">
              <span v-if="form.status">Available</span>
              <span v-else>Not available</span>
            </b-form-checkbox>
            <!-- <b-form-checkbox v-model="EditItem.status">On Sale</b-form-checkbox> -->
          </b-form-group>
        </form>
      </div>
    </b-modal>

    <!-- Edit Item -->
    <b-modal
      v-model="modalEditItemActive"
      title="Edit item detail"
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
                  placeholder="Enter product price"
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
                  placeholder="Enter product cost"
                  type="number"
                  required
                ></b-form-input> </b-form-group
            ></b-col>
          </b-row>
          <b-form-group
            id="input-group-4"
            label="In-stock:"
            label-for="input-instock"
          >
            <b-form-input
              id="input-instock"
              v-model="EditItem.quantity"
              type="text"
              placeholder="Enter product in-stock quantity"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Unit:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="EditItem.unit"
              type="text"
              placeholder="Enter product unit"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="category" label="Category:" label-for="category">
            <b-form-select
              v-model="EditItem.category"
              :options="
                categoryOption.map((e) => ({ value: e.id, text: e.name }))
              "
              class="mb-3"
            >
              {{ EditItem.category }}
            </b-form-select>
          </b-form-group>

          <b-form-group id="input-group-4">
            <b-form-checkbox
              switches
              v-model="EditItem.status"
              button-variant="sucess"
            >
              <span v-if="EditItem.status">Available</span>
              <span v-else>Not available</span>
            </b-form-checkbox>
            <!-- <b-form-checkbox v-model="EditItem.status">On Sale</b-form-checkbox> -->
          </b-form-group>
          <!-- {{ EditItem }} -->
        </form>
      </div>
    </b-modal>

    <!-- Stock Item  -->
    <b-modal v-model="modalStockItemActive" title="Stock Item" @ok="onStock">
      <b-form-input
        id="amount"
        type="number"
        v-model="StockItem.amount"
      ></b-form-input>
    </b-modal>

    <!-- Delete Item  -->
    <b-modal v-model="modalDeleteItemActive" title="Delete Item" @ok="onDelete">
      Are you sure you want to delete this item? Action cannot be undone.
    </b-modal>
  </div>
</template>

<script>
import api from "@/apis";

export default {
  data() {
    return {
      showDismissibleAlert: false,
      items: [],
      categoryOption: [],
      modalAddItemActive: false,
      modalViewItemActive: false,
      modalEditItemActive: false,
      modalStockItemActive: false,
      modalDeleteItemActive: false,
      modalMessageActive: false,
      ViewItem: {},
      EditItem: {},
      StockItem: {
        amount: 0,
      },
      DeleteItem: {},
      text: null,
      form: {
        name: null,
        description: null,
        price: 0,
        cost: 0,
        unit: "ชิ้น",
        quantity: 0,
        status: true,
      },
      selected: {},
      filtering: {},
      viewItemDetailActive: false,
    };
  },
  methods: {
    async initPage() {
      await api
        .getItems()
        .then((result) => {
          this.items = [...result.data];
          this.selected = result.data[0];
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
    reload() {
      this.$router.go(this.$router.currentRoute);
    },
    async addItem() {
      const categoryOption = this.form.category
        ? { category: { connect: [{ id: this.form.category }] } }
        : {};
      await api
        .createItem({
          ...this.form,
          ...categoryOption,
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
      this.EditItem = { ...item };
      this.modalEditItemActive = true;
    },

    async stockOn(item) {
      this.StockItem = { ...this.StockItem, ...item };
      // this.modalViewItemActive = false;
      this.modalStockItemActive = true;
    },

    async deleteOn(item) {
      this.DeleteItem = { ...this.DeleteItem, ...item };
      this.modalDeleteItemActive = true;
    },

    async onEdit() {
      const body = {
        id: this.EditItem.id,
        price: parseInt(this.EditItem.price),
        cost: parseInt(this.EditItem.cost),
        unit: this.EditItem.unit,
        name: this.EditItem.name,
        pic: this.EditItem.pic,
        description: this.EditItem.description,
        status: Boolean(this.EditItem.status),
        quantity: parseInt(this.EditItem.quantity),
        category:
          this.EditItem.category.length > 0
            ? {
                set: {
                  id:
                    typeof this.EditItem.category === "string"
                      ? this.EditItem.category
                      : this.EditItem.category[0].id,
                },
              }
            : {},
      };
      await api
        .editItem(body)
        .then((result) => {
          this.items[
            this.items.findIndex((element) => element.id === result.data.id)
          ] = { ...result.data };
          this.selected = this.EditItem;
          this.$forceUpdate();
        })
        .catch((err) => {
          console.log(err);
        });
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
        this.items.findIndex((element) => element.id === resp.id)
      );
      console.log(index);
      this.items[index].quantity = resp.quantity;
      this.$forceUpdate();
    },

    async onDelete() {},
    onCancelDelete() {
      this.DeleteItem = {};
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
    // onReset(event) {
    //   event.preventDefault();
    //   // Reset our form values
    //   this.form.email = "";
    //   this.form.name = "";
    //   this.form.food = null;
    //   this.form.checked = [];
    //   // Trick to reset/clear native browser form validation state
    //   this.show = false;
    //   this.$nextTick(() => {
    //     this.show = true;
    //   });
    // },
    async itemPreviewOn(item) {
      this.selected = { ...item };
      console.log(this.selected);
    },
  },
  created() {
    this.initPage();
  },
};
</script>

<style>
#left {
  width: 55%;
  overflow-y: auto;
}
.item-card {
  width: 320px;
}
.item-card--img {
  object-fit: cover;
  /* background-color: green; */
}
.button--link {
  color: #696969;
}
/* .item-card:hover .button--link {
  color: #303030;
  font-weight: bold;
  border-bottom: 1px solid #303030;
  cursor: pointer;
}
.item-btn:hover .button--link {
  font-weight: normal;
  cursor: default;
  color: #696969;
} */
.item-btn--stock {
  width: 100%;
}

.big {
  font-size: 1.5em;
}
#right {
  /* width: 50%; */
  height: 70vh;
  overflow-y: auto;
}
#body {
  position: relative;
}
#item-menu {
  /* position: absolute; */
  /* left: 0; */
  width: 80%;
  /* border: 1px solid blue; */
}
#item-preview {
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  width: 400px;
  position: fixed;
  top: 21vh;
  right: 2vh;
}
.item-preview--img {
  width: inherit;
  height: 300px;
  object-fit: cover;
  border: 1px solid #dcdcdc;
  border-radius: 5px 5px 0 0;
  /* float: right; */
}
.item-preivew--btn {
}
.item-btn-mini {
  width: 20%;
}
.test {
  border: 1px solid blue;
}
.bold {
  font-weight: bold;
}
</style>
