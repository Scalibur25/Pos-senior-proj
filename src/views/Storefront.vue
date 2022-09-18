<template>
  <div class="bg">
    <b-container>
      <b-row>
        <b-input-group>
          <b-form-input type="search"></b-form-input>
          <b-button
            ><span
              class="icon-in-button d-flex align-self-center material-icons md-24"
              >search</span
            ></b-button
          >
        </b-input-group>
        <span>Filter:</span>
        <b-dropdown id="dropdown-1" text="Category" class="m-md-2">
          <b-dropdown-item>category1</b-dropdown-item>
        </b-dropdown>
      </b-row>
      <b-row>
        <b-col order="1">
          <b-row>
            <div class="menu d-flex flex-wrap">
              <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 menu--b-card"
              >
                <b-card-text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </b-card-text>
              </b-card>
              <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 menu--b-card"
              >
                <b-card-text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </b-card-text>
              </b-card>
              <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-2 menu--b-card"
              >
                <b-card-text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </b-card-text>
              </b-card>
            </div>
          </b-row>
        </b-col>
        <b-col order="2" cols="4">
          <div
            class="item-list d-flex align-items-center justify-content-between"
          >
            <span class="item-list--child">ggg</span>
          </div>
          <div class="total d-flex align-items-center justify-content-between">
            <span class="total--1 d-none d-md-flex">Total</span>
            <span class="total--2">THB 500.00</span>
            <span class="total--3 d-none d-lg-flex">SUBMIT ORDER</span>
          </div>
          <div></div>
        </b-col>
      </b-row>
      <b-row> </b-row>
    </b-container>
  </div>
</template>
<style>
.bg {
  background-color: #f5f5f5;
}
.icon-in-button {
}
.menu {
}
.menu--b-card {
  margin: 10px;
  width: 15rem;
}
.item-list {
  padding-top: 10px;
}
.item-list--child {
  padding: 10px;
  background-color: white;
  width: 100%;
}
.item-list--child:first-child {
  border-radius: 10px 10px 0 0;
}
.total {
  /* position:fixed; */
  padding: 10px;
  background-color: lightgreen;
  height: 80px;
}
.total--1 {
  font-size: 1em;
}
.total--2 {
  font-size: 1.5em;
  font-weight: bold;
}
.total--3 {
  font-size: 1em;
  /* font-weight: bold; */
}
</style>
<script>
export default {
  name: "StorefrontView",
  components: {},
};
</script>
