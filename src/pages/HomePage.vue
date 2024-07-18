<script>
import axios from "axios";
import { store } from "../store.js";
import AppCard from "../components/AppCard.vue";
import AppTypology from "../components/AppTypology.vue";
import AppHeader from "../components/AppHeader.vue";

export default {
  components: {
    AppCard,
    AppTypology,
    AppHeader
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
        this.store.typologiesArray = resp.data.results;
      });
    },
    getRestaurants() {
      axios
        .get("http://localhost:8000/api/restaurants/", {
          params: { typology_id: this.typology_id, search: store.searchQuery },
        })
        .then((resp) => {
          // console.log(resp.data.results.data);
          this.store.restaurantsArray = resp.data.results;
        });
    },
    searchAction() {
      if (this.searchQuery == "") {
        this.getRestaurants();
      } else {
        this.store.searchQuery = this.query;
        this.getRestaurants();
      }
    },

    filterRestaurants(id) {
      if (this.isTypology == false && this.typology_id !== id) {
        this.typology_id = id;
        this.isTypology = true;
      } else if (this.isTypology == true && this.typology_id === id) {
        this.typology_id = "";
        this.isTypology = false;
      } else if (this.isTypology == true && this.typology_id !== id) {
        this.typology_id = id;
      }

      console.log(this.typology_id);
      console.log(this.isTypology);
      this.getRestaurants();
    },
  },
  created() {
    this.getFilters();
    this.getRestaurants();
  },
};
</script>

<template>

  <AppHeader />

  <div class="container">
    <h4>Scegli i tuoi piatti preferiti:</h4>
    <div class="row">
      <div v-for="typObj in filters" class="col-3">
        <AppTypology
          :typologyObject="typObj"
          @click="filterRestaurants(typObj.id)"
        />
        <!-- <div class="card-body" @click="filterRestaurants(typology.id)">
                            <span>{{ typology.name }}</span>
                        </div> -->
      </div>
    </div>
  </div>
  <hr />

  <div class="container">
    <label for="search">Ricerca</label>
    <input
      type="text"
      id="search"
      name="search"
      @keyup.enter="searchAction()"
      v-model="query"
    />
    <button @click="searchAction()">Cerca</button>
  </div>
  <hr />

  <div class="container">
    <h4>I ristoranti:</h4>
    <div class="row">
      <div class="col-4" v-for="restObj in store.restaurantsArray">
        <AppCard :restaurantObject="restObj" />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
