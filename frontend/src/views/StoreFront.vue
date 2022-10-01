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
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2 menu--b-card"
          >
            <b-card-title>มาการอง</b-card-title>
            <div class="card--price">
              <span class="m-r-10">Price:</span>
              <span class="bold bigger">ราคา</span>
              <span class="mx-2">/</span>
              <span>หน่วย</span>
            </div>
            <div class="my-1">
              <span class="m-r-10">Category:</span>
              <b-button class="m-r-5" variant="outline-info" size="sm" pill
                >fruit product</b-button
              >
              <b-button variant="outline-warning" size="sm" pill
                >fruit product</b-button
              >
            </div>
            <div>
              <span class="m-r-10">In-stock:</span>
              <span>จำนวนในสต็อก</span>
            </div>
          </b-card>
        </div>
      </b-col>
      <b-col cols="4" class="col--2">
        <b-list-group class="item-list">
          <b-list-group-item
            class="d-flex align-items-center justify-content-between"
          >
            <span class="d-flex">
              <span
                class="material-icons align-self-center m-r-10"
                style="color: red"
                >delete</span
              >
              <b-form-spinbutton
                id="demo-sb"
                v-model="value"
                min="1"
                max="100"
                size="sm"
              ></b-form-spinbutton>
            </span>
            <span class="mx-2">แยม</span>
            <span>50.00</span>
          </b-list-group-item>
        </b-list-group>
        <b-button
          class="buttons--submit mt-3 d-flex align-items-center justify-content-between"
          variant="success"
        >
          <span>Total</span>
          <span class="bold bigger">1500.00</span>
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
    <b-row> </b-row>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      value: 50,
    };
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
<script>
export default {
  name: "StorefrontView",
  components: {},
};
</script>
