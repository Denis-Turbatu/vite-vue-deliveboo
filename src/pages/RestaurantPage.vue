<script>
import axios from 'axios';
import { store } from '../store';

export default {
    // props: {
    //     name: String,
    // },
    data() {
        return {
            restaurant: null,
            store,
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
            axios.get(`${this.store.urlBack}/api/restaurants/${slug}`).then((resp) => {
                console.log(resp);
                this.restaurant = resp.data.results;
            })
        }
    }
}
</script>

<template>
    <div class="container my-5">
        <div class="row g-2">
            <div class="ms_cover-image col col-12 col-lg-4">
                <img class="img-fluid" :src="restaurant.image" alt="">
            </div>
            <div class="col col col-12 col-lg-8">
                <h1>{{ restaurant.business_name }}</h1>
                <!-- Dettagli del ristorante -->
            </div>
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
</style>
