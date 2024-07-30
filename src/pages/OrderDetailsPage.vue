<script>
    export default {
        data() {
            return {
                userArray: [],
                userData: {
                    name: '',
                    surname: '',
                    address: '',
                    phone: '',
                    description: ''
                }
            }
        },
        methods: {
            saveDeliveryData() {
                this.userArray.push(this.userData );

                localStorage.setItem('deliveryData', JSON.stringify(this.userArray));
                localStorage.removeItem('userData');
            },
            loadDeliveryData() {
                const storedData = localStorage.getItem('deliveryData');
                if (storedData) {
                    this.userArray = JSON.parse(storedData);
                }
            },
            saveUserData() {
                localStorage.setItem('userData', JSON.stringify(this.userData));
            },
            loadUserData() {
                const storedUserData = localStorage.getItem('userData');
                if (storedUserData) {
                    this.userData = JSON.parse(storedUserData);
                }
            }
        },
        created() {
            this.loadDeliveryData();
            this.loadUserData();
        },
    }
</script>

<template>
    <div class="container pt-5">
        <h1 class="my-5">Inserisci le informazioni per la spedizione</h1>

        <form @submit.prevent="saveDeliveryData" class="mb-3">

            <div class="d-flex justify-content-between">
                <div class="mb-3 w-50 p-2">
                    <label for="name" class="form-label fw-semibold">Nome <span class="text-danger">*</span></label>
                    <input v-model="userData.name" type="text" class="form-control" id="name" name="name" required>
                </div>

                <div class="mb-3 w-50 p-2">
                    <label for="surname" class="form-label fw-semibold">Cognome <span class="text-danger">*</span></label>
                    <input v-model="userData.surname" type="text" class="form-control" id="surname" name="surname"
                        required>
                </div>
            </div>  

            <div class="mb-3 p-2">
                <label for="address" class="form-label fw-semibold">Indirizzo <span class="text-danger">*</span></label>
                <input v-model="userData.address" type="text" class="form-control" id="address" name="address" required>
            </div>

            <div class="mb-3 p-2">
                <label for="phone_number" class="form-label fw-semibold">Telefono<span
                        class="text-danger">*</span></label>
                <input v-model="userData.phone" type="text" class="form-control" id="phone_number" name="phone_number"
                    required>
            </div>

            <div class="form-group p-2">
                <label for="description" class="form-label fw-semibold">Descrizione</label>
                <textarea v-model="userData.description" class="form-control" id="description" rows="5"
                    placeholder="Se ha delle esigenze, scriva qui dentro"></textarea>
            </div>

            <div class="mb-4 mt-4 row">
                <p class="fs-6 fst-italic"><span class="text-danger">*</span> Questi campi sono obbligatori</p>
            </div>

            <router-link to="pagamento" @click="saveUserData" class="btn btn-success ms-3">Vai al pagamento</router-link>
        </form>
    </div>
</template>

<style lang="scss">

</style>
