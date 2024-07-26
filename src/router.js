import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import CartPage from "./pages/CartPage.vue";
import RestaurantPage from "./pages/RestaurantPage.vue";
import PaymentPage from "./pages/PaymentPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import OrderDetailsPage from "./pages/OrderDetailsPage.vue";
import ContactUs from "./pages/ContactUs.vue";
import ThankYouPage from "./pages/ThankYouPage.vue";

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
      path: "/spedizione",
      name: "spedizione",
      component: OrderDetailsPage,
      props: true
    },
    {
      path: "/pagamento",
      name: "pagamento",
      component: PaymentPage,
      props: true
    },
    {
      path: "/successo",
      name: "successo",
      component: ThankYouPage,
      props: true
    },
    {
      path: "/contattaci",
      name: "contattaci",
      component: ContactUs,
      props: true
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
