<template>
  <div>
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
        <b-button @click="modalExportActive = true" variant="success"
          >Export</b-button
        >
      </b-row>
      <b-row>
        <b-col>
          <b-table
            sticky-header="75vh"
            bordered
            select-mode="single"
            head-variant="secondary"
            hover
            :items="itemsOption"
            selectable
            @row-selected="onRowSelected"
            :fields="[
              { key: 'orderId', label: 'Order id' },
              { key: 'createAt', label: 'Datetime created', sortable: false },
            ]"
          >
            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>
            <!-- <template #table-caption>caption is here naka</template> -->
            <template #cell(Order-Details)></template>
          </b-table>
        </b-col>
        <b-col cols="4">
          <div class="preview-order px-3">
            <div class="d-flex flex-column align-items-center bottom-line py-5">
              <div>ORDER ID: {{ selected.orderId }}</div>
              <div>DATETIME CREATED: {{ toDateString(selected.createAt) }}</div>
            </div>
            <div class="bottom-line px-3 py-3">
              <div
                v-for="item in selected.itemList"
                :key="item.id"
                class="d-flex justify-content-between mb-3"
              >
                <div>{{ item.quantity }} x {{ item.Item.name }}</div>
                <div>{{ item.price }}</div>
                <div>{{ item.quantity * item.price }}</div>
              </div>
              <div>
                <div>Subtotal: {{ selected.price }}</div>
                <div>Discount: {{ selected.discount }}</div>
              </div>
            </div>

            <div
              class="preview-order--total d-flex justify-content-between bottom-line px-3 py-3"
            >
              <div>Total:</div>
              <div>{{ selected.price - selected.discount }}</div>
            </div>
            <div class="px-3 py-3">
              <div>Note : {{ selected.note }}</div>
            </div>
            <div></div>
          </div>
          <!-- <b-row
          ><b-col>orderId: {{ selected.orderId }}</b-col
          ><b-col>data: {{ toDateString(selected.createAt) }}</b-col>
        </b-row>
        <b-row><b-col>itemList:</b-col><b-col>price:</b-col> </b-row>
        <b-row v-for="item in selected.itemList" :key="item.id">
          <b-col>{{ item.quantity }} x {{ item.Item.name }}</b-col
          ><b-col>{{ item.quantity * item.price }}</b-col>
        </b-row> -->
        </b-col>
      </b-row>
    </div>
    <!-- view export modal -->
    <b-modal
      v-model="modalExportActive"
      title="Export order history"
      @ok="exportOn"
      hide-footer="true"
    >
      <b-form-group label="Select file type" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          id="radio-group-2"
          v-model="exportChoice"
          :aria-describedby="ariaDescribedby"
          name="radio-sub-component"
        >
          <b-form-radio value="elsx">ELSX</b-form-radio>
          <b-form-radio value="json">JSON</b-form-radio>
          <b-form-radio value="xml">XML</b-form-radio>
          <b-form-radio value="pdf">PDF</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <vue-excel-xlsx
        v-if="exportChoice == 'elsx'"
        :data="itemExcel"
        :columns="columns"
        :file-name="'filename'"
        :file-type="'xlsx'"
        :sheet-name="'sheetname'"
        class="custom-btn"
      >
        Download XLSX
      </vue-excel-xlsx>
      <vue-blob-json-csv
        v-if="exportChoice == 'json'"
        class="custom-btn btn-json"
        tag-name="div"
        file-type="json"
        file-name="OrderHistory"
        title="Download JSON"
        :data="itemJson"
      ></vue-blob-json-csv>

      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="OrderHistory"
        :pdf-quality="2"
        :manual-pagination="true"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="100%"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <!-- PDF Content Here -->
          <div
            class="html2pdf__page-break mx-5 my-3"
            v-for="item in items"
            :key="item.id"
          >
            <div class="d-flex flex-column align-items-center bottom-line py-5">
              <div>ORDER ID: {{ selected.orderId }}</div>
              <div>DATETIME CREATED: {{ toDateString(item.createAt) }}</div>
            </div>
            <div class="bottom-line px-3 py-3">
              <div
                v-for="run in item.itemList"
                :key="run.id"
                class="d-flex justify-content-between mb-3"
              >
                <div>{{ run.quantity }} x {{ run.Item.name }}</div>
                <div>{{ run.price }}</div>
                <div>{{ run.quantity * run.price }}</div>
              </div>
              <div>
                <div>Subtotal: {{ item.price }}</div>
                <div>Discount: {{ item.discount }}</div>
              </div>
            </div>

            <div
              class="preview-order--total d-flex justify-content-between bottom-line px-3 py-3"
            >
              <div>Total:</div>
              <div>{{ item.price - item.discount }}</div>
            </div>
            <div class="px-3 py-3">
              <div>Note : {{ item.note }}</div>
            </div>
          </div>
        </section>
      </vue-html2pdf>
      <button
        v-if="exportChoice == 'xml'"
        class="custom-btn"
        @click="createAndOpenFile()"
      >
        Download XML
      </button>
      <button
        v-if="exportChoice == 'pdf'"
        class="custom-btn"
        @click="generateReport()"
      >
        Download PDF
      </button>
    </b-modal>
  </div>
</template>
<script>
import api from "../apis";
import FileSaver from "file-saver";
import VueHtml2pdf from "vue-html2pdf";

export default {
  data() {
    return {
      exportChoice: "",
      itemExcel: [],
      itemJson: [],
      selected: {},
      items: [
        // { age: 21, first_name: "Larsen", last_name: "Shaw" },
        // { age: 89, first_name: "Geneva", last_name: "Wilson" },
        // { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      modalExportActive: false,
      columns: [
        { label: "orderId", field: "orderId" },
        { label: "note", field: "note" },
        { label: "createAt", field: "createAt" },
        { label: "price", field: "price" },
        { label: "discount", field: "discount" },
        { label: "total", field: "total" },
        { label: "itemName", field: "itemName" },
        { label: "itemPrice", field: "itemPrice" },
        { label: "itemQuantity", field: "itemQuantity" },
        { label: "itemUnit", field: "itemUnit" },
      ],
    };
  },
  components: {
    VueHtml2pdf,
  },
  computed: {
    itemsOption() {
      return this.items.map((e) => {
        const dd = new Date(e.createAt);
        return {
          orderId: e.orderId,
          createAt: `
          ${dd.getDate() > 9 ? dd.getDate() : "0" + dd.getDate()}/${
            dd.getMonth() + 1 > 9
              ? dd.getMonth() + 1
              : "0" + (dd.getMonth() + 1)
          }/${dd.getFullYear()}
          ${dd.getHours() > 9 ? dd.getHours() : "0" + dd.getHours()}:${
            dd.getMinutes() > 9 ? dd.getMinutes() : "0" + dd.getMinutes()
          }:${dd.getSeconds() > 9 ? dd.getSeconds() : "0" + dd.getSeconds()}`,
        };
      });
    },
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    JSONtoXML(obj) {
      let xml = "";
      for (let prop in obj) {
        xml += obj[prop] instanceof Array ? "" : "<" + prop + ">";
        if (obj[prop] instanceof Array) {
          for (let array in obj[prop]) {
            xml += "\n<" + prop + ">\n";
            xml += this.JSONtoXML(new Object(obj[prop][array]));
            xml += "</" + prop + ">";
          }
        } else if (typeof obj[prop] == "object") {
          xml += this.JSONtoXML(new Object(obj[prop]));
        } else {
          xml += obj[prop];
        }
        xml += obj[prop] instanceof Array ? "" : "</" + prop + ">\n";
      }
      xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
      return xml;
    },
    createAndOpenFile() {
      const xml = this.JSONtoXML(this.itemJson);
      var blob = new Blob([xml], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, "order.xml");
    },
    exportOn() {},
    toDateString(date) {
      const dd = new Date(date);
      return `
          ${dd.getDate() > 9 ? dd.getDate() : "0" + dd.getDate()}/${
        dd.getMonth() + 1 > 9 ? dd.getMonth() + 1 : "0" + (dd.getMonth() + 1)
      }/${dd.getFullYear()}
          ${dd.getHours() > 9 ? dd.getHours() : "0" + dd.getHours()}:${
        dd.getMinutes() > 9 ? dd.getMinutes() : "0" + dd.getMinutes()
      }:${dd.getSeconds() > 9 ? dd.getSeconds() : "0" + dd.getSeconds()}`;
    },
    onRowSelected(items) {
      const id = items[0].orderId;
      this.selected = this.items.filter((e) => {
        console.log(e);
        return e.orderId == id;
      })[0];
      console.log(this.selected);
    },
    async initPage() {
      await api
        .getOrder()
        .then((result) => {
          this.selected = result.data[0];
          this.items = [...result.data];

          this.items.forEach((item) => {
            const json = {
              orderId: String(item.orderId),
              note: item.note,
              createAt: item.createAt,
              price: item.price,
              discount: item.discount,
              total: item.price - item.discount,
            };
            const jsonItemList = [];
            item.itemList.forEach((list) => {
              jsonItemList.push({
                ...{
                  itemName: list.Item.name,
                  itemPrice: list.price,
                  itemQuantity: list.quantity,
                  itemUnit: list.Item.unit,
                },
              });

              this.itemExcel.push({
                ...{
                  orderId: String(item.orderId),
                  note: item.note,
                  createAt: item.createAt,
                  price: item.price,
                  discount: item.discount,
                  total: item.price - item.discount,
                  itemName: list.Item.name,
                  itemPrice: list.price,
                  itemQuantity: list.quantity,
                  itemUnit: list.Item.unit,
                },
              });
            });

            this.itemJson.push({ ...json, itemList: jsonItemList });
          });
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
.table-bg {
  background-color: white;
  height: 100%;
}
.preview-order {
  background-color: pink;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  position: sticky;
  top: 180px;
  z-index: 1;
}
.preview-order--total {
  font-size: 2em;
}
.bottom-line {
  border-bottom: 1px solid black;
}
.custom-btn {
  padding: 7px 15px;
  /* border: 1px solid black; */
  border: none;
  background-color: rgb(40, 167, 69);
  border-radius: 5px;
  color: white;
  /* font-size: 17px; */
}
.custom-btn:hover {
  /* background-color: blue; */
  background-color: rgb(40, 140, 69);
}
/* .custom-btn:active {
  border: 3px solid rgb(40, 167, 69);
  opacity: 0.3;
} */
.btn-json {
  width: 145px;
}
.item-pdf {
  page-break-after: always;
}
</style>
