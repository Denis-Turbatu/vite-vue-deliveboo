<script>
  import { store } from "../store";

  export default {
    props: {
      restaurantObject: Object,
    },
    data() {
      return {
        store,
      };
    },
    methods: {
      // goToRestaurantPage() {
      //     this.$router.push({ name: 'Ristorante', params: { name: this.restaurantObject.business_name } });
      // }
    },
  };
</script>

<template>
  <router-link :to="{ name: 'ristorante', params: { slug: restaurantObject.slug } }"
    @click="store.storeRestaurantId = restaurantObject.id" class="card ms-height text-decoration-none mb-2">
    <!-- IMAGE -->
    <img :src="restaurantObject.image" class="card-img-top" alt="Immagine del ristorante"
      v-if="!restaurantObject.image.includes('post_images')" />
    <img :src="`${store.imageBaseUrl}/${restaurantObject.image}`"  class="card-img-top" alt="Immagine del ristorante" v-else />

    <!-- <img class="img-fluid rounded shadow" :src="restaurant.image" alt="Immagine ristorante" v-if="!restaurant.image.includes('post_images')"/>
                        <img class="img-fluid rounded shadow" :src="`${store.imageBaseUrl}/${restaurant.image}`" alt="Immagine ristorante" v-else/> -->
    <!-- ----- -->
    <div class="card-body">
      <h4 class="card-title font-weight-bold ">
        {{ restaurantObject.business_name }}
      </h4>
      <p class="card-text text-end">
        <span class="badge badge-primary mt-2">{{
          restaurantObject.typologies[0].name
        }}</span>
      </p>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
  .card {
    margin: 10px;
    width: 95%;
    height: 280px;
  }

  .card-img-top {
    height: 150px;
    object-fit: cover;
  }

  .ms-height {
    max-height: 300px;
    min-height: 0px;
  }

  .badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
  }

  .badge-primary {
    color: #fff;
    background-color: #ffc107;
  }
</style>
