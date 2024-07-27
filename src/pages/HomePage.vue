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
    getImageUrl(name, ext) {
      return new URL(`../assets/img/${name}.${ext}`, import.meta.url).href
    }
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
    <div class="hero-image-container" :style="{
      'background': 'url(' + getImageUrl('pizza', 'jpg') + ')',
      'background-size': 'cover',
      'background-position': 'bottom'
    }">
      <div class="hero-text text-white">
        <h3>SCEGLI I TUOI PIATTI PREFERITI &hearts;</h3>
        <span>Tu ordini noi arriviamo in un DeliveBoo!</span>
      </div>
      <div class="search-container">
        <input class="form-control me-2" type="text" id="search" name="search" @keyup.enter="searchAction()"
          v-model="query" placeholder="Cerca" aria-label="Search" />
        <button class="btn btn-success" type="submit" @click="searchAction()">
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

          <div class="col-6 col-sm-4 " v-for="typObj in filters" :key="typObj.id">
            <AppTypology :typologyObject="typObj" :isActive="isActive(typObj.id)"
              @toggleActive="filterRestaurants(typObj.id)" />
          </div>
        </div>
      </div>
    </div>
    <!-- /TYPOLOGIES SECTION -->

    <!-- RESTAURANTS SECTION -->
    <div class="container py-3">
      <h4>Ristoranti:</h4>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4" v-for="restObj in store.restaurantsArray" :key="restObj.id">
          <AppCard :restaurantObject="restObj" />
        </div>
      </div>
    </div>
    <!-- /RESTAURANTS SECTION -->
  </main>
</template>

<style lang="scss">
main {
  overflow-y: hidden;
}

.typology-text {
  z-index: 9999;
  background-color: white;
  color: black;
}

.bg-typology {
  position: relative;
  background-color: rgba(242, 242, 242, 0.703);
  background-image: url("https://i.pinimg.com/564x/d3/7c/67/d37c672cdcfeee231731fc9568aa7e8a.jpg");
  /* // background-size: cover;
    // background-position: center; */
}

.bg-typology::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,
      255,
      255,
      0.8);
  /* This adds a white overlay with 50% opacity */
  pointer-events: none;
  /* Ensures the overlay doesn't interfere with any interactive elements */
}

.hero-image-container {
  position: relative;
  width: 100%;
  height: 60vh;
  background-size: cover;
  background-position: bottom;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 950px) {
    height: 40vh;
    background-position: center;
  }

  @media (max-width: 480px) {
    height: 30vh;
    background-position: top;
  }

  @media (max-width: 360px) {
    height: 30vh;
    background-position: top;
  }

}

.hero-text {
  position: absolute;
  left: 60%;
  top: 40%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  padding: 20px;
  color: white;
  text-align: right;
  font-size: 1.5rem;

  @media (max-width: 950px) {
    h3 {
      font-size: 1.5rem;
    }

    span {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 650px) {
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 1.25rem;
    }

    span {
      font-size: 1rem;
    }
  }

  @media (max-width: 360px) {
    white-space: nowrap;

    h3 {
      font-size: 1rem;
    }

    span {
      font-size: 0.75rem;
    }
  }
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
  box-sizing: border-box;
}
</style>