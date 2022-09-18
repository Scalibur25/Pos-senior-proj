<template>
  <div>
    <b-container>
      <b-row>
        <b-col
          ><b-input-group>
            <b-form-input type="search"></b-form-input>
            <b-button
              ><span class="material-icons md-24">search</span></b-button
            >
          </b-input-group>
        </b-col>
        <b-col><b-button href="#" variant="primary">Add Item</b-button></b-col>
      </b-row>
      <b-row>
        <div class="loop">
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>
            <b-button href="#" variant="primary">Add Stock</b-button>
            <b-button href="#" variant="primary">Edit Item</b-button>
          </b-card>
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>
            <b-button href="#" variant="primary">Add Stock</b-button>
            <b-button href="#" variant="primary">Edit Item</b-button>
          </b-card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<style></style>
<script>
export default {
  name: "HomeView",
  components: {},
};
</script>
