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
                typology_id: "",
                isTypology: false,
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
                axios.get("http://localhost:8000/api/restaurants/", { params: { typology_id: this.typology_id, search: store.searchQuery} }).then((resp) => {
                    // console.log(resp.data.results.data);
                    this.store.restaurantsArray = resp.data.results;
                });
            },
            searchAction() {
                if(this.searchQuery == ''){
                    this.getRestaurants();
                }else{
                    this.store.searchQuery = this.query;
                    this.getRestaurants();
                }
            },

            filterRestaurants(id) {
                if (this.isTypology == false && this.typology_id !== id) {
                    this.typology_id = id;
                    this.isTypology = true;
                } else if (this.isTypology == true && this.typology_id === id) {
                    this.typology_id = '';
                } else if (this.isTypology == true && this.typology_id !== id) {
                    this.typology_id = id;
                }

                console.log(this.typology_id);
                console.log(this.isTypology);
                this.getRestaurants();
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
                    <div class="card-body" @click="filterRestaurants(typology.id)">
                        <span>{{ typology.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <label for="search">Ricerca</label>
        <input type="text" id="search" name="search" @keyup.enter="searchAction()" v-model="query" />
        <button @click="searchAction()">Cerca</button>

        <div>
            <div class="content">
                <div class="row">
                    <div class="col-4" v-for="restObj in store.restaurantsArray">
                        <AppCard :restaurantObject="restObj" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>