<script>
import {store} from '../store.js';
export default {
    data () {
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
            <a class="navbar-brand">Navbar</a>
            <form class="d-flex" role="search">
                <button class="btn btn-outline-success" type="submit">Search</button>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
</template>

<style scoped lang="scss">

</style>