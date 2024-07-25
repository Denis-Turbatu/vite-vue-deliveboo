<template>
    <div id="dropin-wrapper">
        <div id="checkout-message"></div>
        <div id="dropin-container"></div>
        <button id="submit-button" @click="submitPayment">Submit payment</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'PaymentPage',
        data() {
            return {
                dropinInstance: null,
                tokenizationKey: '', // Inserisci qui la tua chiave di tokenizzazione
                payData: [],
            };
        },
        methods: {
            async initializeDropin() {
                try {
                    const response = await axios.get('http://localhost:8000/api/orders/generate');
                    this.tokenizationKey = response.data.token;

                    braintree.dropin.create({
                        authorization: this.tokenizationKey,
                        container: '#dropin-container',
                    }, (createErr, instance) => {
                        if (createErr) {
                            console.error(createErr);
                            return;
                        }
                        this.dropinInstance = instance;
                    });
                } catch (error) {
                    console.error('Errore durante il recupero del token:', error);
                }
            },
            async submitPayment() {
                if (!this.dropinInstance) {
                    console.error('Drop-in instance non è stata inizializzata');
                    return;
                }

                this.dropinInstance.requestPaymentMethod(async (err, payload) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    try {
                        const response = await axios.post('http://localhost:8000/api/orders/checkout', { 
                            json_data: localStorage.getItem('paymentData'),
                            token: payload.nonce 
                        });

                        this.dropinInstance.teardown(teardownErr => {
                            if (teardownErr) {
                                console.error('Non è stato possibile smontare l\'interfaccia Drop-in:', teardownErr);
                            } else {
                                console.info('Interfaccia Drop-in smontata');
                                document.getElementById('submit-button').remove();
                            }
                        });

                        if (response.data.success) {
                            document.getElementById('checkout-message').innerHTML = '<h1>Successo</h1><p>L\'interfaccia Drop-in funziona! Controlla il tuo <a href="https://sandbox.braintreegateway.com/login">pannello di controllo sandbox</a> per le tue transazioni di prova.</p><p>Aggiorna per provare un\'altra transazione.</p>';
                        } else {
                            console.error(response.data);
                            document.getElementById('checkout-message').innerHTML = '<h1>Errore</h1><p>Controlla la console.</p>';
                        }
                    } catch (error) {
                        console.error('Errore durante il pagamento:', error);
                    }
                });
            },
        },
        created() {
            this.payData = JSON.parse(localStorage.getItem('paymentData'));
        },
        mounted() {
            this.initializeDropin();
        },
    };
</script>

<style scoped>
    /* Aggiungi qui i tuoi stili personalizzati */
</style>