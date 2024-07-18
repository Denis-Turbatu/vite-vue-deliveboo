<script>
    import axios from "axios";
    import { store } from "../store.js";

    export default {
        data() {
            return {
                filters: [],
                query: "",
                store
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
            }
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
                    <div class="card-body">
                        {{ typology.name }}
                    </div>
                </div>
            </div>
        </div>

        <label for="search">Ricerca</label>
        <input type="text" id="search" name="search" v-model="query" />
        <button @click="searchAction()">Cerca</button>
    </div>
</template>

<style lang="scss"></style>