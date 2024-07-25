<script>
import { store } from "../store";
export default {
  data() {
    return {
      store,
      cartArray: [],
      slug: null,
      productsArray: [],
    };
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
    incrementCart(index) {
      this.cartArray[index].quantity++;
      this.updateCartInLocalStorage();
    },
    decrementCart(index) {
      if (this.cartArray[index].quantity > 1) {
        this.cartArray[index].quantity--;
        this.updateCartInLocalStorage();
      }
    },
    deleteProd(index) {
      this.cartArray.splice(index, 1);
      this.updateCartInLocalStorage();

      if (this.cartArray.length == 0) {
        this.store.cardNum = 0;
        localStorage.setItem("cardNumber", JSON.stringify(this.store.cardNum));
      } else {
        this.updateCardNum();
      }
    },
    saveProductsData() {
      localStorage.setItem("productsData", JSON.stringify(this.productsArray));
    },
    updateCartInLocalStorage() {
      localStorage.setItem("cartProducts", JSON.stringify(this.cartArray));
      this.updateCardNum();
    },
    updateCardNum() {
      this.store.cardNum = this.cartArray.reduce((acc, cur) => acc + cur.quantity, 0);
      localStorage.setItem("cardNumber", JSON.stringify(this.store.cardNum));
    }
  },
  watch: {
    cartArray: {
      handler(updatedCart) {
        localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      },
      deep: true,
    },
  },
  created() {
    this.cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
    this.slug = JSON.parse(localStorage.getItem("curSlug"));
    this.store.cardNum = JSON.parse(localStorage.getItem("cardNumber")) || 0;
    this.cartArray.forEach((product) => {
      const newProduct = {
        dish_id: product.id,
        quantity: product.quantity,
      };
      this.productsArray.push(newProduct);
    });
    console.log(this.productsArray);
  },
};
</script>

<template>
  <div v-if="this.store.cardNum !== 0" class="container">
    <div class="cart my-4">
      <div class="d-flex justify-content-between">
        <h1 class="mb-4">Il tuo carrello</h1>
        <router-link :to="`/ristorante/${slug}`">
          <button class="btn text-warning">
            Torna al Menu
            <i class="fa-solid fa-utensils"></i>
          </button>
        </router-link>
      </div>
      <div class="row">
        <div class="col-12">
          <div
            class="card mb-4 p-3 d-flex flex-row align-items-center justify-content-between"
          >
            <div class="flex-grow-1 d-flex flex-column">
              <div
                class="info border border-1 my-2 w-75 rounded me-3 d-flex align-items-center"
                v-for="(curCartProd, index) in cartArray"
                :key="index"
              >
                <div class="ms-3 me-5">
                  <span>{{
                    getProductPrice(curCartProd.price, curCartProd.quantity)
                  }}</span>
                </div>
                <div
                  class="ms-1 d-flex align-items-center justify-content-between flex-grow-1"
                >
                  <section class="ms-2">
                    <h6 class="fw-semibold mt-2 mb-2">
                      {{ curCartProd.name }}
                    </h6>
                    <p class="m-0 mb-1">{{ curCartProd.description }}</p>
                  </section>

                  <!-- INPUT -->
                  <div class="me-3">
                    <div
                      class="input-group input-group-sm ms-auto"
                      style="width: 100px"
                    >
                      <button
                        class="btn btn-outline-warning btn-sm"
                        type="button"  @click.prevent="decrementCart(index)"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        class="form-control text-center"
                        v-model.number="curCartProd.quantity"
                        readonly
                      />
                      <button
                        class="btn btn-outline-warning btn-sm"
                        type="button"  @click.prevent="incrementCart(index)"
                      >
                        +
                      </button>
                    </div>
                    <span class="me-2" @click="deleteProd(index)">
                      <i class="fa-solid fa-trash-can text-danger"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 d-flex justify-content-between">
          <router-link
            :to="{ name: 'spedizione' }"
            class="btn btn-success ms-3"
            @click="saveProductsData()"
            >Procedi all'ordine</router-link
          >

          <h3>
            Totale: <span>{{ getOrderPrice() }}</span
            >€
          </h3>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <h1 class="mb-4">
        Oops! Il tuo carrello è vuoto, ma il tuo stomaco non deve esserlo!
      </h1>
      <span>Riempi il carrello con amore!</span>
      <router-link :to="{ name: 'home' }" class="btn btn-success ms-3"
        >Home</router-link
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.ms-cart-prod {
  border: solid 2px orange;
  padding: 5px 6px;
  margin-inline: 5px;
  width: 70px;
}
.btn-outline-warning:hover{
  color:white
}
</style>
