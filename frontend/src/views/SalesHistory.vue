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
        <b-table
          bordered
          sticky-header
          head-variant="secondary"
          hover
          :items="items"
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #table-caption>caption is here naka</template>
          <template #cell(Order-Details)></template>
        </b-table>
      </b-col>
      <b-col> </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          datetime_submitted: "02/10/2022 13:14:00",
          order_id: 10705011027,
        },
        // { age: 21, first_name: "Larsen", last_name: "Shaw" },
        // { age: 89, first_name: "Geneva", last_name: "Wilson" },
        // { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};
</script>
<style>
.table-bg {
  background-color: white;
  height: 100%;
}
</style>
