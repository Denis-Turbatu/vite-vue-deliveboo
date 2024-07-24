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
                localStorageRestaurantId: null,
                selectedDishes: [],
                store,
                restSlug: null,
                isLoaded: false,
                dishQuantities: [],
                visibleDishes: [],
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
                            this.visibleDishes = this.restaurant.dishes.filter((dish) => dish.visibility === 1)

                            this.dishQuantities =
                                this.visibleDishes.map(() => 0);
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
                // event.preventDefault();
                this.store.cardNum = 0;

                const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
                const cartRestaurantId = JSON.parse(localStorage.getItem("localStorageRestaurantId"));

                if (cartProducts.length > 0 && cartRestaurantId && cartRestaurantId !== this.store.storeRestaurantId) {
                    alert("Non puoi aggiungere prodotti da un ristorante diverso. Svuota il carrello per aggiungere nuovi prodotti.");
                    return;
                }

                const updatedDishes = this.restaurant.dishes
                    .map((dish, index) => ({
                        ...dish,
                        quantity: this.dishQuantities[index],
                    }))
                    .filter(dish => dish.quantity > 0);

                console.log(updatedDishes);

                // per vedere il numeretto nel carrello
                updatedDishes.forEach((curElemQuantity) => {
                    this.store.cardNum += curElemQuantity.quantity;
                })

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
                localStorage.setItem("localStorageRestaurantId", JSON.stringify(this.store.storeRestaurantId));
                localStorage.setItem("cardNumber", JSON.stringify(this.store.cardNum));
                this.$router.push({ name: "carrello" });
            },
            incrementCart(index) {
                this.dishQuantities[index]++;
            },
            decrementCart(index) {
                if (this.dishQuantities[index] > 1) {
                    this.dishQuantities[index]--;
                }
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
                    <form class="w-75">
                        <div class="card ms-prod my-3 w-100 d-flex flex-row align-items-center justify-content-between"
                            v-for="(dish, index) in visibleDishes" :key="index">
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
                            <span class="d-flex justify-content-between align-items-center">

                                <div class="quantity">
                                    <span href="#" class="quantity__minus"
                                        @click.prevent="decrementCart(index)"><span>-</span></span>
                                    <input name="quantity" type="text" class="quantity__input"
                                        v-model.number="dishQuantities[index]">
                                    <span href="#" class="quantity__plus"
                                        @click.prevent="incrementCart(index)"><span>+</span></span>
                                </div>

                                <!-- <input type="number" min="0" class="ms-cart-prod"
                                    v-model.number="dishQuantities[index]" /> -->
                            </span>
                        </div>

                        <button type="submit" class="btn btn-success" @click.prevent="goToCartPage">Vai al
                            carrello</button>
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
    .ms-img-product {
        width: 70px;
        height: 70px;
    }

    .quantity {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .quantity__minus,
    .quantity__plus {
        display: block;
        width: 25px;
        height: 25px;
        margin: 0;
        background: #a0a0a1;
        text-decoration: none;
        text-align: center;
        line-height: 23px;
        color: #fff;
    }

    .quantity__minus:hover,
    .quantity__plus:hover {
        background: #575b71;
        color: #fff;
        cursor: pointer;
    }

    .quantity__minus {
        border-radius: 3px 0 0 3px;
    }

    .quantity__plus {
        border-radius: 0 3px 3px 0;
    }

    .quantity__input {
        width: 30px;
        height: 25px;
        margin: 0;
        padding: 0;
        text-align: center;
        border-top: 2px solid #a0a0a1;
        border-bottom: 2px solid #a0a0a1;
        border-left: 1px solid #a0a0a1;
        border-right: 2px solid #a0a0a1;
        background: #fff;
        color: black;
    }

    .quantity__minus:link,
    .quantity__plus:link {
        color: #fff;
    }

    .quantity__minus:visited,
    .quantity__plus:visited {
        color: #fff;
    }
</style>