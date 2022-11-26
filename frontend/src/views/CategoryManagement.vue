<template>
  <div class="outer pt-4 px-5">
    <b-row class="search-bar d-flex align-items-center pb-2">
      <b-button variant="success" @click="modalAddCategoryActive = true">
        Add category</b-button
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
    </b-row>
    <b-row>
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(actions)="data">
          <b-button class="mr-1" @click="editOn(data)">Edit</b-button>
          <b-button
            @click="
              () => {
                deleteTarget = data.item.id;
                modalDeleteCategoryActive = true;
              }
            "
            >Delete</b-button
          >
        </template>
      </b-table>
    </b-row>

    <!-- Add Category -->
    <b-modal
      v-model="modalAddCategoryActive"
      title="Add New Category"
      @ok="onSubmit"
    >
      <div>
        <form ref="form">
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              placeholder="Enter category name"
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
              placeholder="Enter category description"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </div>
    </b-modal>

    <!-- Edit Category -->
    <b-modal
      v-model="modalEditCategoryActive"
      title="Edit category"
      @ok="onEdit"
    >
      <form ref="form">
        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="EditCategory.name"
            type="text"
            placeholder="Enter category name"
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
            v-model="EditCategory.description"
            placeholder="Enter category description"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <!-- Confirm Delete Category -->
    <b-modal
      v-model="modalDeleteCategoryActive"
      title="Delete category"
      @ok="onDelete(deleteTarget)"
      @cancel="
        () => {
          deleteTarget = '';
        }
      "
    >
      Are you sure you want to delete this category?
    </b-modal>
  </div>
</template>

<script>
import api from "../apis";

export default {
  data() {
    return {
      fields: ["name", "description", "count", "actions"],
      items: [],
      deleteTarget: "",
      modalAddCategoryActive: false,
      form: {
        name: null,
        description: null,
      },
      modalEditCategoryActive: false,
      EditCategory: {
        name: "",
        description: "",
      },
      modalDeleteCategoryActive: false,
    };
  },
  methods: {
    async initPage() {
      await api
        .getCategory()
        .then((result) => {
          // console.log(result);
          this.items = result.data.map((e) => {
            const v = e;
            //console.log(e);
            v.count = e._count.item;
            return v;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      this.addCategory();
    },
    async onDelete(index) {
      //console.log(index);
      await api.deleteCategory(index).then((result) => {
        if (result.status === 200) {
          this.items = this.items.filter((e) => e.id !== result.data.id);
        }
      });
    },
    async addCategory() {
      await api
        .createCategory({
          ...this.form,
        })
        .then((result) => {
          result.status === 200
            ? (this.modalAddCategoryActive = false)
            : this.modalAddCategoryActive;
          result.data.count = result.data._count.item;
          this.items = [...this.items, result.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editOn(category) {
      this.EditCategory = { ...category.item };
      this.modalEditCategoryActive = true;
    },
    async onEdit() {
      const body = {
        id: this.EditCategory.id,
        name: this.EditCategory.name,
        description: this.EditCategory.description,
      };
      await api
        .updateCategory(body)
        .then((result) => {
          result.data.count = result.data._count.item;
          const index =
            parseInt(
              this.items.findIndex((element) => element.id > result.data.id)
            ) - 1;
          this.items[index].name = result.data.name;
          this.items[index].count = result.data.count;
          this.items[index].description = result.data.description;

          this.$forceUpdate();
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
