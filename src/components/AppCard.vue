<script>
    export default {
        props: {
            restaurantObject: Object,
        }
    }
</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="card">
            <img :src="restaurantObject.image" class="card-img-top" alt="Immagine del ristorante">
            <div class="card-body text-center">
                <h3 class="card-title font-weight-bold">{{ restaurantObject.business_name }}</h3>
                <p class="card-text">{{ restaurantObject.slug }}</p>
                <p class="card-text">{{ restaurantObject.address }}</p>
                <p class="card-text"><span class="badge badge-primary">{{ restaurantObject.typologies[0].name }}</span></p>
                <button class="btn btn-primary">Vedi Menu</button>
            </div>
        </div>
    </div>
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
    background-color: rgb(25 135 84);
}
</style>