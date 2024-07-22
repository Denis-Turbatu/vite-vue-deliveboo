<script>
  export default {
    data() {
      return {
        cartArray: [],
        slug: null,
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
      deleteProd(index) {
        this.cartArray.splice(index, 1);
        localStorage.setItem("cartProducts", JSON.stringify(this.cartArray));
      },
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
    },
  }; 
</script>

<template>
  <div class="container">
    <div class="cart my-4">
      <div class="d-flex justify-content-between">
        <h1 class="mb-4">Il tuo carrello</h1>
        <router-link :to="`/ristorante/${slug}`">
          <button class="btn btn-outline-primary">Torna al Menu</button>
        </router-link>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card mb-4 p-3 d-flex flex-row align-items-center justify-content-between">
            <div class="flex-grow-1 d-flex flex-column">
              <div class="info border border-1 my-2 w-75 rounded me-3 d-flex align-items-center"
                v-for="(curCartProd, index) in cartArray" :key="index">
                <div class="ms-3 me-5">
                  <span>{{ getProductPrice(curCartProd.price, curCartProd.quantity) }}</span>
                </div>
                <div class="ms-1 d-flex align-items-center justify-content-between flex-grow-1">
                  <section class="ms-2">
                    <h6 class="fw-semibold mt-2 mb-2">{{ curCartProd.name }}</h6>
                    <p class="m-0 mb-1">{{ curCartProd.description }}</p>
                  </section>
                  <div class="me-3">
                    <span class="mx-4">
                      <input type="number" min="0" class="ms-cart-prod" v-model.number="curCartProd.quantity" />
                    </span>
                    <span class="me-2" @click="deleteProd(index)">
                      <i class="fa-solid fa-trash-can text-danger"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-end">
          <h3>
            Totale: <span>{{ getOrderPrice() }}</span>€
          </h3>
        </div>
      </div>
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
</style>