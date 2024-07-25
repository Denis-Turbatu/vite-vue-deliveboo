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
      if (this.typology_id === id) {
        this.typology_id = "";
      } else {
        this.typology_id = id;
      }
      this.getRestaurants();
    },
    isActive(id) {
      return this.typology_id === id;
    },
  },
  created() {
    this.getFilters();
    this.getRestaurants();
    this.store.cardNum = JSON.parse(localStorage.getItem("cardNumber")) || 0;
  },
};
</script>

<template>
  <main>
    <!-- HERO SECTION -->
    <div class="hero-image-container">
      <div class="hero-text">
        <h2>SCEGLI I TUOI PIATTI PREFERITI &hearts;</h2>
        <p>Tu ordini noi arriviamo in un DeliveBoo!</p>
      </div>
      <div class="search-container">
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
          class="btn btn-success"
          type="submit"
          @click="searchAction()"
        >
          Cerca
        </button>
      </div>
    </div>
    <!-- /HERO SECTION -->

    <!-- TYPOLOGIES SECTION -->
     
    <div class="bg-typology py-4">
      <div class="container">
        <h4 class="typology-text text-center">Scegli i tuoi piatti preferiti</h4>
        
        <div class="row row-cols-3 row-cols-md-5">
          
          <div class="col-6 col-sm-4 " v-for="typObj in filters"  :key="typObj.id">
            <AppTypology
              :typologyObject="typObj"
              :isActive="isActive(typObj.id)"
              @toggleActive="filterRestaurants(typObj.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- /TYPOLOGIES SECTION -->

    <!-- RESTAURANTS SECTION -->
    <div class="container py-4">
      <h4>I ristoranti:</h4>
      <div class="row">
        <div
          class="col-12 col-sm-6 col-md-4"
          v-for="restObj in store.restaurantsArray"
          :key="restObj.id"
        >
          <AppCard :restaurantObject="restObj" />
        </div>
      </div>
    </div>
    <!-- /RESTAURANTS SECTION -->
  </main>
</template>

<style lang="scss">
.typology-text {
  z-index: 9999;
  background-color: white;
  color: black;
}
.bg-typology {
  position: relative;
  background-color: rgba(242, 242, 242, 0.703);
  background-image: url("https://i.pinimg.com/564x/d3/7c/67/d37c672cdcfeee231731fc9568aa7e8a.jpg");
  // background-size: cover;
  // background-position: center;
}

.bg-typology::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    255,
    255,
    255,
    0.8
  ); /* This adds a white overlay with 50% opacity */
  pointer-events: none; /* Ensures the overlay doesn't interfere with any interactive elements */
}
.hero-image-container {
  position: relative;
  width: 100%;
  height: 60vh;
  background-image: url("https://pixabay.com/get/gfd975c84d0e723735176d01298849903b53e5092c958c9f285e281f1dbaf709dc0b71b4b34601fe3b4fc38c4c4f17891d6139ad2b54710a891c4466cafb007c0_1280.jpg");
  background-size: cover;
  background-position: bottom;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  
}

.hero-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  max-width: 40%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 5px;
}

.search-container {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 70%;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.479);
  padding: 10px;
  border-radius: 5px;
}
</style>
