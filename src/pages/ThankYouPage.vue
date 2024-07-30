<script>
  import { store } from '../store'

  export default {
    data() {
      return {
        store,
        user: [],
        cartArray: []
      };
    },
    created() {
      this.user = JSON.parse(localStorage.getItem('userData'));
      this.cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
    },
    methods: {
      getProductPrice(price, quantity) {
        return parseFloat(price * quantity).toFixed(2);
      },
      getOrderPrice() {
        let totalPrice = 0;

        for (const product of this.cartArray) {
          if (typeof product === "object" && product !== null) {
            totalPrice += parseFloat(product.price) * parseInt(product.quantity);
          }
        }

        return totalPrice.toFixed(2);
      },
      clear() {
        localStorage.clear();
      }
    }
  };

</script>

<template>
  <div class="container ">
    <h2 class="my-4 text-success">Ordine effettuato con successo <i class="fa-solid fa-wand-sparkles"></i>
    </h2>
    <p class="fst-italic ">Mi raccomando tieni il telefono vicino a te! Il Rider sta arrivando! <i
        class="fa-solid fa-car-on"></i></p>
  </div>

  <!-- Qui inserire il riepologo dell'ordine -->
  <div class="container">
    <h5>Riepilogo Ordine:</h5>
    <div class="row">
      <div class="col-12">
        <div class="card mb-4 p-3">
          <div class="flex-grow-1">
            <div class="info border border-1 my-2 w-100 rounded p-3 d-flex flex-column flex-md-row align-items-center">

              <div class="flex-grow-1 d-flex flex-column flex-md-row align-items-center justify-content-between">
                <section class="ms-2 text-center text-md-start">
                  <h6 class="fw-semibold mt-2 mb-2">Nome</h6>
                  <p class="m-0">{{ user.name }}</p>
                </section>
              </div>
              <div class="flex-grow-1 d-flex flex-column flex-md-row align-items-center justify-content-between">
                <section class="ms-2 text-center text-md-start">
                  <h6 class="fw-semibold mt-2 mb-2">Cognome</h6>
                  <p class="m-0">{{ user.surname }}</p>
                </section>
              </div>
              <div class="flex-grow-1 d-flex flex-column flex-md-row align-items-center justify-content-between">
                <section class="ms-2 text-center text-md-start">
                  <h6 class="fw-semibold mt-2 mb-2">Indirizzo</h6>
                  <p class="m-0">{{ user.address }}</p>
                </section>
              </div>
              <div class="flex-grow-1 d-flex flex-column flex-md-row align-items-center justify-content-between">
                <section class="ms-2 text-center text-md-start">
                  <h6 class="fw-semibold mt-2 mb-2">Telefono</h6>
                  <p class="m-0">{{ user.phone }}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4 p-3">
          <div class="flex-grow-1">
            <div class="info border border-1 my-2 w-100 rounded p-3 d-flex flex-column flex-md-row align-items-center"
              v-for="(curCartProd, index) in cartArray" :key="index">
              <div class="d-flex flex-column align-items-center align-items-md-start ms-md-3 me-md-5 mb-3 mb-md-0">
                <span>{{ getProductPrice(curCartProd.price, curCartProd.quantity) }} €</span>
              </div>
              <div class="flex-grow-1 d-flex flex-column flex-md-row align-items-center justify-content-between">
                <section class="ms-2 text-center text-md-start">
                  <h6 class="fw-semibold mt-2 mb-2">{{ curCartProd.name }}</h6>
                  <p class="m-0 mb-1">{{ curCartProd.description }}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- BOTTON -->
      <div class="container">
        <div class="d-flex justify-content-between flex-wrap mb-3">
          <router-link :to="{ name: 'home' }" class="btn btn-success  mb-2 mt-2" @click="clear()">Torna alla
            Home</router-link>
          <h3 class="mb-2 mt-2">
            Totale: <span>{{ getOrderPrice() }}</span>€
          </h3>
        </div>
      </div>
    </div>
  </div>


  <!-- /Qui inserire il riepologo dell'ordine -->


</template>

<style scoped lang="scss"></style>