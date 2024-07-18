<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            menu: [
                {
                    title: "HomePage",
                    routeName: "home"
                }
            ]
        }
    }
}
</script>

<template>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <img src="../assets/img/deliveboo_1.jpg" alt="">
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Cerca" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Cerca</button>
            </form>
        </div>
    </nav>
</template>

<style scoped lang="scss">
img {
    width: 20%;
}
</style>