
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
        created()  {
          this.user = JSON.parse(localStorage.getItem('userData'));
          

          this.cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];

                        
        }
    };

</script>

<template>
    <div class="container pt-5">
        <h2 class="my-5">Ordine effettuato con successo!</h2>

        <p>Mi raccomando tieni il telefono vicino a te! Il Rider sta arrivando!</p>

        <!-- Qui inserire il riepologo dell'ordine -->
            <h4>Riepilogo Ordine!</h4>
            <p>{{ this.user }}</p>
            <div class="container">
              <div class="row">
        <div class="col-12">
          <div class="card mb-4 p-3">
            <div class="flex-grow-1">
              <div
                class="info border border-1 my-2 w-100 rounded p-3 d-flex flex-column flex-md-row align-items-center"
                v-for="(curCartProd, index) in cartArray"
                :key="index"
              >
                <div class="d-flex flex-column align-items-center align-items-md-start ms-md-3 me-md-5 mb-3 mb-md-0">
                  <span>{{ getProductPrice(curCartProd.price, curCartProd.quantity) }} €</span>
                </div>
                <div class="flex-grow-1 d-flex flex-column flex-md-row align-items-center justify-content-between">
                  <section class="ms-2 text-center text-md-start">
                    <h6 class="fw-semibold mt-2 mb-2">{{ curCartProd.name }}</h6>
                    <p class="m-0 mb-1">{{ curCartProd.description }}</p>
                  </section>
                  <div class="me-3 d-flex flex-column align-items-center flex-md-row">
                    <div class="input-group input-group-sm ms-auto" style="width: 100px">
                      <button class="btn btn-outline-warning btn-sm" type="button" @click.prevent="decrementCart(index)">-</button>
                      <input type="text" class="form-control text-center" v-model.number="curCartProd.quantity" readonly />
                      <button class="btn btn-outline-warning btn-sm" type="button" @click.prevent="incrementCart(index)">+</button>
                    </div>
                    <span class="me-2 mt-2 mt-md-0 ms-md-2" @click="deleteProd(index)">
                      <i class="fa-solid fa-trash-can text-danger"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 d-flex justify-content-between flex-wrap">
          <router-link :to="{ name: 'spedizione' }" class="btn btn-success ms-3 mb-2" @click="saveProductsData()">Procedi all'ordine</router-link>
          <h3 class="mb-2">
            Totale: <span>{{ getOrderPrice() }}</span>€
          </h3>
        </div>
      </div>
            </div>


        <!-- /Qui inserire il riepologo dell'ordine -->

    </div>
</template>