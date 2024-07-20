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
    AppHeader,
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
  <header>
    <AppHeader />
  </header>

  <main>
    <div class="bg-typology">
      <div class="container">
        <h4>Scegli i tuoi piatti preferiti:</h4>
        <div class="row row-cols-3 row-cols-md-5">
          <div v-for="typObj in filters" class="col">
            <AppTypology
              :typologyObject="typObj"
              @click="filterRestaurants(typObj.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <hr />

    <!-- SEARCH -->
    <div class="container">
      <div class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="text"
          id="search"
          name="search"
          @keyup.enter="searchAction()"
          v-model="query"
          placeholder="Cerca"
          aria-label="Search"
        />
        <button
          class="btn btn-outline-success"
          type="submit"
          @click="searchAction()"
        >
          Cerca
        </button>
      </div>
    </div>
    <!-- /SEARCH -->
    <hr />

    <div class="container">
      <h4>I ristoranti:</h4>
      <div class="row">
        <div class="col-4" v-for="restObj in store.restaurantsArray">
          <AppCard :restaurantObject="restObj" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.bg-typology {
  background-color: gray;
}
</style>
