<script>
export default {
    props: {
        name: String,
    },
    data() {
        return {
            restaurant: null,
            // Da aggiornare
        };
    },
    created() {
        this.fetchRestaurantData();
    },
    methods: {
        fetchRestaurantData() {
            // Inserire chiamata API
            // Esempio:
            // this.restaurant = findRestaurantByName(this.name);
        }
    }
}
</script>

<template>
    <div>
        <h1>{{ name }}</h1>
        <!-- Dettagli del ristorante -->
    </div>
</template>

<style scoped>
/* Aggiungi stili qui */
</style>
