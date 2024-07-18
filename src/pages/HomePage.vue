<script>
    import axios from "axios";
    import { store } from "../store.js";
    import AppCard from "../components/AppCard.vue";

    export default {
        components: {
            AppCard,
        },
        data() {
            return {
                filters: [],
                query: "",
                store,
                // typology_id: "",
            };
        },
        methods: {
            getFilters() {
                axios.get("http://localhost:8000/api/typologies/").then((resp) => {
                    console.log(resp.data.results);
                    this.filters = resp.data.results;
                });
            },
            getRestaurants() {
                axios.get("http://localhost:8000/api/restaurants/").then((resp) => {
                    // console.log(resp.data.results.data);
                    this.store.restaurantsArray = resp.data.results.data;
                });
            },
            filterRestaurants() {
                const filteredRestaurants = this.store.restaurantsArray.filter((restaurant) => {
                    return restaurant.business_name
                        .toLowerCase()
                        .includes(this.query.toLowerCase());
                });
                
                console.log("Filtered restaurants:", filteredRestaurants);
            },
            searchAction() {
                this.store.searchQuery = this.query;
                this.filterRestaurants();
            },
            // storeFilter(id){
            //     this.typology_id = id;
            // },
            // searchFilter(){
            //     axios.get("http://localhost:8000/api/restaurants/", {params: {typology_id: this.typology_id}}).then((resp) => {
            //         console.log(resp.data.results.data);
            //         // this.store.restaurantsArray = resp.data.results.data;
            //     });
            // }
        },
        created() {
            this.getFilters();
            this.getRestaurants();
        }
    };
</script>

<template>
    <div>
        <h1>homepage</h1>

        <div class="content">
            <div class="row">
                <div v-for="typology in filters" class="card col-3">
                    <div class="card-body" @click="storeFilter(typology.id)">
                        {{ typology.name }}
                    </div>
                </div>
            </div>
        </div>

        <label for="search">Ricerca</label>
        <input type="text" id="search" name="search" v-model="query" />
        <button @click="searchAction()">Cerca</button>

        <div>
            <div class="content">
            <div class="row">
                <div class="col" v-for="restObj in store.restaurantsArray">
                    <AppCard :restaurantObject="restObj"/>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style lang="scss"></style>