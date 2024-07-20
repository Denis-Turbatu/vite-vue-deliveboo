<script>
export default {
    props: {
        restaurantObject: Object,
    },
    methods: {
        goToRestaurantPage() {
            this.$router.push({ name: 'Ristorante', params: { name: this.restaurantObject.business_name } });
        }
    }
}
</script>

<template>
        <router-link :to="{name: 'Ristorante', params: {slug: restaurantObject.slug}}" class="card ms-height text-decoration-none">
            <img :src="restaurantObject.image" class="card-img-top" alt="Immagine del ristorante">
            <div class="card-body text-center">
                <h3 class="card-title font-weight-bold">{{ restaurantObject.business_name }}</h3>
                <!-- <p class="card-text">{{ restaurantObject.slug }}</p>
                <p class="card-text">{{ restaurantObject.address }}</p> -->
                <p class="card-text"><span class="badge badge-primary">{{ restaurantObject.typologies[0].name }}</span></p>
                <button class="btn btn-primary" @click="goToRestaurantPage">Vedi Menu</button>
            </div>
        </router-link>
</template>

<style scoped lang="scss">
.card {
    width: 18rem;
    margin: 10px;
}
.card-img-top {
    height: 150px;
    object-fit: cover;
}
.ms-height {
    max-height: 420px;
    min-height: 420px;
}
.card-body {
    text-align: center;
}
.d-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}
.badge {
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
}
.badge-primary {
    color: #fff;
    background-color: #ffc107;
}
</style>
