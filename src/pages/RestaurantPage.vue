<script>
    import axios from "axios";
    import { store } from "../store";
    import NotFoundPage from "./NotFoundPage.vue";

    export default {
        components: {
            NotFoundPage,
        },
        data() {
            return {
                restaurant: [],
                selectedDishes: [],
                store,
                restSlug: null,
                isLoaded: false,
                dishQuantities: [],
            };
        },
        methods: {
            fetchRestaurantData() {
                this.isLoaded = true;
                const slug = this.$route.params.slug;

                axios
                    .get(`${this.store.urlBack}/api/restaurants/${slug}`)
                    .then((resp) => {
                        if (resp.data.results) {
                            this.restaurant = resp.data.results;
                            this.dishQuantities = this.restaurant.dishes.map(() => 0); // inizializza quantità a 0 per ogni piatto 
                            const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
                            cartProducts.forEach(cartProduct => {
                                const index = this.restaurant.dishes.findIndex(dish => dish.name === cartProduct.name);
                                if (index !== -1) {
                                    this.dishQuantities[index] = cartProduct.quantity;
                                }
                            });
                        } else {
                            this.restaurant = [];
                        }
                        this.isLoaded = false;
                    })
                    .catch(() => {
                        this.restaurant = [];
                        this.isLoaded = false;
                    });
            },
            goToCartPage() {
                event.preventDefault();

                const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

                const updatedDishes = this.restaurant.dishes
                    .map((dish, index) => ({
                        ...dish,
                        quantity: this.dishQuantities[index],
                    }))
                    .filter(dish => dish.quantity > 0);

                updatedDishes.forEach(updatedDish => {
                    const index = cartProducts.findIndex(cartProduct => cartProduct.name === updatedDish.name);
                    if (index !== -1) {
                        cartProducts[index] = updatedDish;
                    } else {
                        cartProducts.push(updatedDish);
                    }
                });

                this.selectedDishes = cartProducts;
                this.restSlug = this.restaurant.slug;

                localStorage.setItem("cartProducts", JSON.stringify(this.selectedDishes));
                localStorage.setItem("curSlug", JSON.stringify(this.restSlug));
                this.$router.push({ name: "carrello" });
            },
        },
        created() {
            this.fetchRestaurantData();
        },
    }; 
</script>

<template>
    <div v-if="!isLoaded">
        <div v-if="restaurant && restaurant.id">
            <div class="container my-5">
                <div class="mb-3">
                    <router-link :to="{ name: 'home' }" class="text-decoration-none">Indietro</router-link>
                </div>
                <div class="row g-2 mb-5">
                    <div class="ms_cover-image col col-12 col-lg-4">
                        <img class="img-fluid" :src="restaurant.image" alt="" />
                    </div>
                    <div class="col col col-12 col-lg-8">
                        <h1>{{ restaurant.business_name }}</h1>
                    </div>
                </div>

                <div class="row">
                    <form class="w-75" @submit.prevent="goToCartPage">
                        <div class="card ms-prod my-3 w-100 d-flex flex-row align-items-center justify-content-between"
                            v-for="(dish, index) in restaurant.dishes" :key="index">
                            <div class="d-flex justify-content-between flex-grow-1 align-items-center p-2">
                                <div class="ms-1 d-flex align-items-center">
                                    <img :src="dish.thumb" class="ms-img-product rounded" alt="" />
                                    <section class="ms-2">
                                        <h6 class="fw-semibold mt-2 mb-2">{{ dish.name }}</h6>
                                        <p class="m-0 mb-1">{{ dish.description }}</p>
                                    </section>
                                </div>
                                <div class="me-3">
                                    <span>{{ dish.price }}€</span>
                                </div>
                            </div>
                            <span class="d-flex justify-content-between">
                                <input type="number" min="0" class="ms-cart-prod"
                                    v-model.number="dishQuantities[index]" />
                            </span>
                        </div>

                        <button type="submit" class="btn btn-success">Vai al carrello</button>
                    </form>
                </div>
            </div>
        </div>
        <div v-else>
            <NotFoundPage />
        </div>
    </div>
    <div class="fw-bold px-3" v-else>Sta caricando</div>
</template>

<style scoped lang="scss">
    .ms-cart-prod {
        border: solid 2px orange;
        padding: 5px 6px;
        margin-inline: 5px;
        width: 200px;
    }

    .ms-img-product {
        width: 70px;
        height: 70px;
    }
</style>