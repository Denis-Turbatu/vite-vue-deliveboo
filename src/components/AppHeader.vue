<script>
import { store } from "../store.js";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <!-- Carrello visibile sempre, accanto al logo -->
      <router-link :to="{ name: 'carrello' }" class="btn position-relative d-flex align-items-center me-3 d-lg-none">
        <i class="fas fa-shopping-cart custom-cart"></i>
        <span id="ms_card-num">{{ store.cardNum }}</span>
      </router-link>

      <!-- Logo -->
      <router-link :to="{ name: 'home' }" class="navbar-brand">
        <img src="../assets/img/deliveboo_1.jpg" alt="Logo" class="ms_logo" />
      </router-link>

      <!-- Menu toggle per mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu a discesa -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="ms-auto d-flex flex-column flex-lg-row align-items-lg-center">
          <router-link
            :to="{ name: 'carrello' }"
            class="btn position-relative d-none d-lg-flex align-items-center me-3"
          >
            <i class="fas fa-shopping-cart custom-cart"></i>
            <span id="ms_card-num">{{ store.cardNum }}</span>
          </router-link>
          <a
            target="_blank"
            class="btn btn-outline-success ms-lg-2 my-2 my-lg-0"
            href="http://localhost:8000/"
            >Lavora con noi</a
          >
          <router-link
            :to="{ path: '/contattaci' }"
            class="btn btn-outline-warning ms-lg-2 my-2 my-lg-0"
            >Contattaci</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.ms_logo {
  width: 50%; 
}

#ms_card-num {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  width: 24px;
  height: 24px;
  border: 1px solid #dc3545;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: -8px;
  right: -8px;
  color: #dc3545; /* Match the color of the cart icon */
}

.custom-cart {
  font-size: 1.5rem;
  color: #dc3545; /* Set the cart icon color to red */
}

.btn-outline-warning:hover {
  color: rgb(255, 255, 255);
}

@media (max-width: 768px) {
  .navbar-brand img {
    width: 150px;
  }

  .btn-outline-success,
  .btn-outline-warning {
    font-size: 0.8rem; /* Reduce font size for buttons */
  }

  #ms_card-num {
    width: 20px; 
    height: 20px; 
    top: -2px; 
    right: -8px; 
  }
}
</style>


