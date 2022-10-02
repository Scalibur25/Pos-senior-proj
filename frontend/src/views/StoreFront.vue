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
          <b-overlay
            v-for="item in items"
            :key="item.id"
            :show="item.quantity < 1"
            spinner-variant="primary"
            spinner-type="grow"
            spinner-small
            rounded="sm"
            style="max-width: 320px"
          >
            <template #overlay>
              <b-icon
                icon="stopwatch"
                variant="info"
                scale="2"
                shift-v="8"
                shift-h="8"
                class="position-absolute"
                style="top: 0; right: 0"
              ></b-icon>
            </template>
            <b-card
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
          </b-overlay>
        </div>
      </b-col>
      <b-col cols="4" class="col--2">
        <b-list-group class="item-list">
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
        <b-button
          class="buttons--submit mt-3 d-flex align-items-center justify-content-between"
          variant="success"
          @click="calculateModelOrder()"
        >
          <span>Total</span>
          <span class="bold bigger">{{
            cart.reduce((previousValue, currentValue) => {
              return currentValue.price * currentValue.amount + previousValue;
            }, 0)
          }}</span>
          <span>SUBMIT ORDER</span>
        </b-button>
        <b-button class="buttons--preview mt-2" variant="outline-secondary">
          Preview Receipt
        </b-button>

        <!-- <div class="total mx-2 my-4">
          <span class="me-3">Total :</span>
          <span class="bold bigger">1500.00</span>
        </div>
        <div class="buttons d-flex align-items-center justify-content-between">
          <b-button
            variant="success"
            size="lg"
            class="buttons--submit bold me-1"
            >SUBMIT ORDER</b-button
          >
          <b-button class="buttons--preview">Preview Receipt</b-button>
        </div> -->

        <!-- <div class="total d-flex align-items-center justify-content-between">
          <span class="total--1 d-none d-md-flex">Total</span>
          <span class="total--2">THB 500.00</span>
          <span class="total--3 d-none d-lg-flex">SUBMIT ORDER</span>
        </div> -->
      </b-col>
    </b-row>
    <b-modal
      v-model="confirmOrderModal"
      @ok="createOrder"
      @cancel="reload"
    ></b-modal>
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
    };
  },
  methods: {
    async initPage() {
      await api
        .getReadyItems()
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
      } else {
        target.quantity > 0 ? this.cart.push(initCartBody) : this.cart;
      }
      console.log(this.cart);
    },
    removeFromCart(target) {
      this.cart = this.cart.filter((value) => value.id !== target);
    },
    reload() {
      this.$router.go(this.$router.currentRoute);
    },

    calculateModelOrder() {
      this.confirmOrderModal = this.cart.length > 0 ? true : false;
    },

    async createOrder() {
      await api
        .createOrder({
          paidAt: this.paidStatus ? new Date() : null,
          itemlist: this.cart,
        })
        .then((result) => {
          if (result.status === 200) {
            this.reload();
          } else {
            //error hander
          }
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
  height: 425px;
  background-color: white;
  position: sticky;
  top: 190px;
  overflow-y: auto;
}
.item-list--child {
  padding: 10px;
  width: 100%;
}
.buttons--preview {
  width: 200px;
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
