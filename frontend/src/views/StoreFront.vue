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
        <div class="menu d-flex flex-wrap">
          <b-card
            v-for="item in items"
            :key="item.id"
            :img-src="item.pic"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2 menu--b-card"
            @click="addToCard(item)"
          >
            <b-card-title>{{ item.name }}</b-card-title>
            <div class="card--price">
              <span class="me-2">Price:</span>
              <span class="bold bigger">{{ item.price }}</span>
              <span class="mx-2">/</span>
              <span>{{ item.unit }}</span>
            </div>
            <div class="my-1">
              <span class="me-2">Category:</span>
              <b-button
                v-for="cate in item.category"
                :key="cate.id"
                class="me-1"
                variant="outline-info"
                size="sm"
                pill
                >{{ cate.name }}</b-button
              >
            </div>
            <div>
              <span class="me-2">In-stock:</span>
              <span>{{ item.quantity }}</span>
            </div>
          </b-card>
        </div>
      </b-col>
      <b-col cols="4" class="col--2">
        <b-list-group class="item-list mb-3">
          <b-list-group-item
            v-for="car in cart"
            :key="car.id"
            class="d-flex align-items-center justify-content-between"
          >
            <span class="d-flex align-items-center">
              <b-button
                variant="outline-light"
                style="outline: none !important"
                @click="removeFromCart(car.id)"
                ><b-icon
                  variant="danger"
                  icon="trash-fill"
                  font-scale="1"
                ></b-icon
              ></b-button>

              <b-form-spinbutton
                id="demo-sb"
                v-model="car.amount"
                :min="1"
                :max="car.quantity"
                inline
              ></b-form-spinbutton>
            </span>
            <span class="mx-2 text-truncate">{{ car.name }}</span>
            <span>{{ car.price }}</span>
          </b-list-group-item>
        </b-list-group>
        <b-card>
          <div class="d-flex align-items-center mb-3">
            <span class="m-r-10">Discount:</span>
            <b-form-input
              class="m-r-10"
              placeholder="add discount of this order"
              type="number"
              v-model="discount"
            ></b-form-input>
            <span>{{ discount }}</span>
          </div>
          <div class="d-flex align-items-center mb-3">
            <span class="m-r-10">Notes:</span>
            <b-form-textarea placeholder="add notes ..."></b-form-textarea>
          </div>
        </b-card>
        <b-button
          class="buttons--submit mt-3 d-flex align-items-center justify-content-between"
          variant="success"
          @click="confirmOrderModal = true"
        >
          <span>Total</span>
          <span class="bold bigger">{{
            cart.reduce((previousValue, currentValue) => {
              return currentValue.price * currentValue.amount + previousValue;
            }, 0)
          }}</span>
          <span>SUBMIT ORDER</span>
        </b-button>
        <b-button v-b-modal.modal-submit-1>Draft for SUBMIT ORDER</b-button>
        <b-modal id="modal-submit-1" title="BootstrapVue">
          <p class="my-4">Hello from modal!</p>
        </b-modal>
      </b-col>
    </b-row>
    <b-row> </b-row>
    <b-modal v-if="confirmOrderModal && cart.length > 0"></b-modal>
  </div>
</template>

<script>
import api from "../apis";

export default {
  data() {
    return {
      confirmOrderModal: false,
      items: [],
      amount: 50,
      cart: [],
      paidStatus: false,
      // BootstrapVue switch checkbox
      checked: false,
      discount: 0,
    };
  },
  methods: {
    async initPage() {
      await api
        .getItems()
        .then((result) => {
          console.log(result);
          this.items = [...result.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCard(target) {
      const initCartBody = {
        amount: 1,
        quantity: target.quantity,
        name: target.name,
        id: target.id,
        price: target.price,
      };
      const index = this.cart.findIndex((e) => e.id === target.id);
      console.log(index);
      if (index >= 0) {
        this.cart[index].amount < this.cart[index].quantity
          ? (this.cart[index].amount += 1)
          : this.cart[index].amount;
      } else this.cart.push(initCartBody);
      console.log(this.cart);
    },
    removeFromCart(target) {
      this.cart = this.cart.filter((value) => value.id !== target);
    },

    async createOrder() {
      await api
        .createOrder({
          paidAt: this.paidStatus ? new Date() : null,
          itemlist: this.cart,
        })
        .then((result) => {
          console.log(result);
          return result.data;
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
