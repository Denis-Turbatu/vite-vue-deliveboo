<script>
import { store } from "../store.js";
export default {
  data() {
    return {
      store,
      navItems: [
        {
          routeName: "home",
          title: "Home",
        },
        {
          routeName: "carrello",
          title: "Cart",
        },
      ],
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <router-link :to="{name: 'home'}">
        <img src="../assets/img/deliveboo_1.jpg" alt="" class="navbar-brand ms_logo" />
        
      </router-link>

      <div class="d-flex align-items-center">
        <!-- <a href="#" class="btn btn-link position-relative">
          <i class="fas fa-shopping-cart"></i>
        </a> -->
        <router-link :to="{name: 'carrello'}" class="btn btn-link position-relative">
          <i class="fas fa-shopping-cart custom-cart"></i>
        </router-link>
        <router-link :to="{path: '/lavora-con_noi'}" class="btn btn-outline-success ms-2"
          >Lavora con noi</router-link>
        <router-link :to="{path: '/contattaci'}" class="btn btn-outline-warning ms-2"
          >Contattaci</router-link
        >
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
img {
  width: 40%;
}
.custom-cart,
.fa-shopping-cart {
  font-size: 1.5rem;
  color: #dc3545; /* Imposta il colore dell'icona del carrello a rosso */
}

a {
  text-decoration: none;
}
/* Bottone dettagli */
.btn-outline-warning:hover {
    color: rgb(255, 255, 255);
}
</style>
