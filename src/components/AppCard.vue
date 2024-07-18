<script>
    export default {
        props:{
            restaurantObject: Object,
        }
    }
</script>

<template>
    <div class="col">
        <div class="card">
            <img src="" class="card-img-top" alt="">
            <div class="card-body">
                <p class="card-text">{{restaurantObject.business_name}}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>