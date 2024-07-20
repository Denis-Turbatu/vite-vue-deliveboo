<script>
    import axios from "axios";
    import { store } from "../store";

    export default {
        // props: {
        //     name: String,
        // },
        data() {
            return {
                restaurant: [],
                store
            };
        },
        created() {
            this.fetchRestaurantData();
        },
        methods: {
            fetchRestaurantData() {
                // Inserire chiamata API
                // Esempio:
                // this.restaurant = findRestaurantByName(this.name);
                const slug = this.$route.params.slug;
                // console.log(slug);
                axios
                    .get(`${this.store.urlBack}/api/restaurants/${slug}`)
                    .then((resp) => {
                        console.log(resp.data);
                        this.restaurant = resp.data.results;
                    });
            }
        }
    };
</script>

<template>
    <!-- container -->
    <div class="container my-5">
        <div class="mb-3">
            <router-link :to="{name: home}" class="text-decoration-none">Indietro</router-link>
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
            <form action="" method="" class="w-50">
                <!-- card per ogni piatto -->
                <div class="card my-3 w-100 d-flex flex-row align-items-center justify-content-between" v-for="(dish, index) in this.restaurant.dishes">
                    <!-- nome piatto -->
                    <h3>{{ dish.name }}</h3>
                    <!-- contenitore + input quantità -->
                    <span class="d-flex justify-content-between">
                        <input type="number" min="0" value="0">
                    </span>
                </div>

                <router-link :to="{name: 'cart'}">
                    <button type="submit">Vai al carrello</button>
                </router-link>
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

 .ms-add-cart{
    border: solid 2px orange;
    padding: 5px 6px;
    margin-inline: 5px;
 }
</style>