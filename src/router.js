import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import CartPage from "./pages/CartPage.vue";
import RestaurantPage from "./pages/RestaurantPage.vue";
import PaymentPage from "./pages/PaymentPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/carrello",
      name: "carrello",
      component: CartPage,
      props: true
    },
    {
      path: "/ristorante/:slug",
      name: "ristorante",
      component: RestaurantPage,
      props: true
    },
    {
      path: "/pagamento",
      name: "pagamento",
      component: PaymentPage,
    },
    {
      //qualsiasi rotta tranne quelli specificati sopra
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundPage
    }
  ]
});
export { router };
