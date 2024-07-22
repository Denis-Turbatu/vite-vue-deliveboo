<script>
import axios from "axios";
import { store } from "../store.js";
import AppCard from "../components/AppCard.vue";
import AppTypology from "../components/AppTypology.vue";

export default {
  components: {
    AppCard,
    AppTypology,
  },
  data() {
    return {
      filters: [],
      query: "",
      store,
      typology_id: "",
      isTypology: false,
      isLoaded: false,
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
      this.isLoaded = true;
      axios
        .get("http://localhost:8000/api/restaurants/", {
          params: { typology_id: this.typology_id, search: store.searchQuery },
        })
        .then((resp) => {
          //sort() funzione JS - i ristoranti sono in ordine alfabetico n
          this.store.restaurantsArray = resp.data.results.sort((a, b) =>
            a.business_name.localeCompare(b.business_name)
          );
          this.isLoaded = false;
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
  <!-- HERO SECTION -->
  <!-- <div class="hero-video-container">
    <video class="hero-video" autoplay muted loop>
      <source
        src="https://cdn.pixabay.com/video/2023/08/04/174561-851804290_large.mp4"
        type="video/mp4"
      />
    </video>
  </div> -->
  <!-- /HERO SECTION -->

  <div v-if="!isLoaded">
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
        <hr />
      </div>
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
          <div
            class="col-12 col-sm-6 col-md-4"
            v-for="restObj in store.restaurantsArray"
          >
            <AppCard :restaurantObject="restObj" />
          </div>
        </div>
      </div>
    </main>
  </div>
  <div class="fw-bold px-3" v-else>Sta caricando</div>
</template>

<style lang="scss">
.bg-typology {
  background-color: rgb(227, 227, 227);
}

// .hero-video-container {
//   position: relative;
//   width: 100%;
//   height: 80vh;
//   overflow: hidden;
// }

// .hero-video {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transform: translate(-50%, -50%);
// }
</style>
