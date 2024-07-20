<script>
    import axios from "axios";
    import { store } from "../store";

    export default {
        data() {
            return {
                restaurant: [],
                selectedDishes: [],
                store
            };
        },
        created() {
            this.fetchRestaurantData();
        },
        methods: {
            fetchRestaurantData() {
                const slug = this.$route.params.slug;

                axios
                    .get(`${this.store.urlBack}/api/restaurants/${slug}`)
                    .then((resp) => {
                        // console.log(resp.data);
                        this.restaurant = resp.data.results;
                    });
            },
            goToCartPage() {
                // evitare che il click attivi cose secondarie
                event.preventDefault();

                // struttura per i dati + estrazione dati
                const selectedDishes = [];
                const inputs = document.querySelectorAll("input.ms-cart-prod");

                // creazione struttura dati
                inputs.forEach((curProd) => {
                    const quantity = parseInt(curProd.value);

                    if (quantity > 0) {
                        selectedDishes[curProd.id] = {
                            name: this.restaurant.dishes[curProd.id].name,
                            description: this.restaurant.dishes[curProd.id].description,
                            price: this.restaurant.dishes[curProd.id].price,
                            quantity,
                        };
                    }
                });

                // assegnazione alla variabile vue
                this.selectedDishes = selectedDishes;
                
                // passaggio alla pagina CartPage.vue con i dati in formato JSON
                localStorage.setItem("cartProducts", JSON.stringify(this.selectedDishes))
                this.$router.push({
                    name: 'cart',
                });
            },
        },
    };
</script>

<template>
    <!-- container -->
    <div class="container my-5">
        <div class="mb-3">
            <router-link :to="{name: 'home'}" class="text-decoration-none">Indietro</router-link>
        </div>
        <!-- sezione immagine-titoli -->
        <div class="row g-2 mb-5">
            <!-- immagine -->
            <div class="ms_cover-image col col-12 col-lg-4">
                <img class="img-fluid" :src="this.restaurant.image" alt="" />
            </div>
            <!-- titoli -->
            <div class="col col col-12 col-lg-8">
                <h1>{{ this.restaurant.business_name }}</h1>
            </div>
        </div>

        <!-- contenitore menu -->
        <div class="row">
            <!-- form per selezionare i piatti desiderati -->
            <form class="w-75" @submit.prevent="goToCartPage">
                <!-- card per ogni piatto -->
                <div class="card ms-prod my-3 w-100 d-flex flex-row align-items-center justify-content-between"
                    v-for="(dish, index) in this.restaurant.dishes">
                    <!-- nome piatto -->
                    <div class="d-flex justify-content-between flex-grow-1 align-items-center p-2">
                        <div class="ms-1 d-flex align-items-center">
                            <img :src="`${dish.thumb}`" class="ms-img-product rounded" alt="">
                            <section class="ms-2">
                                <h6 class="fw-semibold mt-2 mb-2">
                                    {{ dish.name }}
                                </h6>
                                <p class="m-0 mb-1">
                                    {{ dish.description }}
                                </p>
                            </section>
                        </div>
                        <div class="me-3">
                            <span>
                                {{ dish.price }}
                            </span>
                        </div>
                    </div>
                    <!-- contenitore + input quantità -->
                    <span class="d-flex justify-content-between">
                        <input type="number" min="0" value="0" class="ms-cart-prod" :id="index">
                    </span>
                </div>

                <button type="submit" class="btn btn-success">Vai al carrello</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
    /* Aggiungi stili qui */
    /* .ms_cover-image {
    height: 300px;
    width: 350px;
    background-repeat: no-repeat;
    background-size: cover;
} */

    .ms-cart-prod {
        border: solid 2px orange;
        padding: 5px 6px;
        margin-inline: 5px;
        width: 200px;
    }

    .ms-img-product{
        width: 70px;
        height: 70px;
    }
</style>