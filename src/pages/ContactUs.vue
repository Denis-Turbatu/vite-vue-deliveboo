<script>
    export default {
        data() {
            return {

            }
        }
    }

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="my-5">
                <h1>Siamo qui per aiutarti!</h1>
                <h5>Mandaci una mail e ti risponderemo il prima possibile, oppure puoi contattarci telefonicamente</h5>

            </div>
            <div class="d-flex">
                <div class="email">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Indirizzo Email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label"></label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
    
                </div>
                <div class="phone">
                    <h6>+39 333 444 8888</h6>
                </div>

            </div>

        </div>

    </div>
</template>


<style scoped lang="scss">

.email {
    width: 50%;
    margin-right: 1.5rem;
}
</style>