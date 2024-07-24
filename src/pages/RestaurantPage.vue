<script>
import axios from "axios";
import { store } from "../store";
import NotFoundPage from "./NotFoundPage.vue";
import * as bootstrap from "bootstrap";

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
                        this.visibleDishes = this.restaurant.dishes.filter((dish) => dish.visibility === 1);

                        this.dishQuantities = this.visibleDishes.map(() => 0);
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
            this.store.cardNum = 0;

            const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
            const cartRestaurantId = JSON.parse(localStorage.getItem("localStorageRestaurantId"));
            const cartNumber = JSON.parse(localStorage.getItem("cardNumber"));
            this.store.cardNum = cartNumber;

            if (cartProducts.length > 0 && cartRestaurantId && cartRestaurantId !== this.store.storeRestaurantId) {
                console.log('apri il modale');

                const modal = new bootstrap.Modal(
                    document.getElementById('modal-befor-cart')
                );

                modal.show();
            } else {
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
            }

        },
        shakeCart() {
            console.log('svuota');

            this.store.cardNum = 0;

            localStorage.removeItem("cartProducts");
            localStorage.removeItem("localStorageRestaurantId");
            localStorage.removeItem("cardNumber");

            const modal = new bootstrap.Modal(
                document.getElementById('modal-befor-cart')
            );

            modal.hide();
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
        this.store.cardNum = JSON.parse(localStorage.getItem("cardNumber"));
    },
};
</script>

<template>
    <div v-if="!isLoaded">
        <div v-if="restaurant && restaurant.id">
            <div class="container my-5">
                <div class="mb-3">
                    <router-link :to="{ name: 'home' }" class="btn btn-primary">Indietro</router-link>
                </div>
                <div class="row g-2 mb-5">
                    <div class="col-12 col-lg-8">
                        <h1 class="display-4">{{ restaurant.business_name }}</h1>
                        <h3>{{ restaurant.address }}</h3>
                    </div>
                </div>

                <div class="row g-2">
                    <div class="col-12 col-lg-4">
                        <img class="img-fluid rounded shadow" :src="restaurant.image" alt="Immagine ristorante" />
                    </div>
                    <div class="col-12 col-lg-8" style="height: 500px; overflow-y: auto;">
                        <form>
                            <div class="card mb-3 shadow-sm" v-for="(dish, index) in visibleDishes" :key="index">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img :src="dish.thumb" class="img-fluid rounded-start" alt="Immagine piatto"
                                            style="width: 150px; height: 150px;" />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body d-flex flex-column justify-content-between h-100">
                                            <div>
                                                <h5 class="card-title">{{ dish.name }}</h5>
                                                <p class="card-text">{{ dish.description }}</p>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="fw-bold">{{ dish.price }}€</span>
                                                <div class="input-group input-group-sm ms-auto" style="width: 100px;">
                                                    <button class="btn btn-outline-secondary btn-sm" type="button"
                                                        @click.prevent="decrementCart(index)">-</button>
                                                    <input type="text" class="form-control text-center"
                                                        v-model.number="dishQuantities[index]" readonly>
                                                    <button class="btn btn-outline-secondary btn-sm" type="button"
                                                        @click.prevent="incrementCart(index)">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <span class="d-flex justify-content-between">
                                <input type="number" min="0" class="ms-cart-prod"
                                    v-model.number="dishQuantities[index]" />
                            </span> -->


                            <!-- <button type="submit" class="btn btn-success" @click.prevent="goToCartPage">Vai al
                                carrello</button> -->
                        </form>
                    </div>
                </div>
                <button type="submit" class="btn btn-success mt-3 ms-auto d-block" @click.prevent="goToCartPage">Vai al
                    carrello</button>
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