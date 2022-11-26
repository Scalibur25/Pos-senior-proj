import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/stock",
    name: "stock",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/StockManagement.vue"),
  },
  {
    path: "/",
    name: "store",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/StoreFront.vue"),
  },
  {
    path: "/history",
    name: "history",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SalesHistory.vue"),
  },
  {
    path: "/category",
    name: "category",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CategoryManagement.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
