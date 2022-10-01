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
        <b-row>
          <div class="menu d-flex flex-wrap">
            <b-card
              img-src="https://picsum.photos/600/300/?image=25"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2 menu--b-card"
            >
              <b-card-title>แยมตามฤดูกาล</b-card-title>
              <div>THB 50 / piece</div>
              <div>Fruit Product</div>
              <div>In-stock: 10</div>
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
      <b-col cols="4" class="">
        <b-list-group class="item-list">
          <b-list-group-item v-b-modal.modal-1>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-modal id="modal-1" title="Edit Order Item">
            <div>Name:</div>
            <div>Price:</div>
            <div>Order Quantity:</div>
            <!-- dddd -->
            <b-button v-b-toggle.collapse-1>Add Markup</b-button>
            <b-collapse id="collapse-1" class="mt-2">
              <b-card>
                <p class="card-text">Collapse contents Here</p>
              </b-card>
            </b-collapse>
          </b-modal>

          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>

          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div class="input-group">
              <button><b-icon icon="dash" /></button>
              <span class="mx-3">1</span>
              <button><b-icon icon="plus" /></button>
              <span class="ms-3">testtesttest</span>
            </div>
          </b-list-group-item>
          <b-list-group-item></b-list-group-item>
        </b-list-group>
        <div class="total d-flex align-items-center justify-content-between">
          <span class="total--1 d-none d-md-flex">Total</span>
          <span class="total--2">THB 500.00</span>
          <span class="total--3 d-none d-lg-flex">SUBMIT ORDER</span>
        </div>
      </b-col>
    </b-row>
    <b-row> </b-row>
  </div>
</template>
<style>
.search-bar {
  position: sticky;
  top: 120px;
  /* background-color: #f5f5f5; */
  z-index: 2;
}
.menu {
  z-index: 1;
}
.menu--b-card {
  margin: 6px;
  width: 14rem;
}
.item-list {
  margin-top: 6px;
  height: 40%;
  background-color: white;
  position: sticky;
  top: 190px;
  overflow-y: auto;
}
.item-list--child {
  padding: 10px;
  width: 100%;
}
.item-list--child:first-child {
}
.total {
  padding: 10px;
  background-color: #4dc460;
  height: 80px;
  position: fixed;
  bottom: 50px;
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
}
#dropdown-category {
  /* width: 250px; */
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
