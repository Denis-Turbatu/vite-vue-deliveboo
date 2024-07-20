import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import CartPage from "./pages/CartPage.vue";
import RestaurantPage from "./pages/RestaurantPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
    },
    {
      path: "/ristorante/:slug",
      name: "Ristorante",
      component: RestaurantPage,
      props: true
    },
  ],
});
export { router };
