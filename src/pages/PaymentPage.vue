<template>
    <div>
        <div id="dropin-container"></div>
        <button @click="handlePayment" class="button button--small button--green">Purchase</button>
        <div v-html="checkoutMessage"></div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                tokenApi: '', // Assicurati che questo venga aggiornato correttamente
                dropinInstance: null,
                checkoutMessage: '',
                urlBase: 'http://127.0.0.1:8000'
            };
        },
        async created() {
            await this.takeToken()
            await this.createDropinInstance();
        },
        beforeDestroy() {
            if (this.dropinInstance) {
                this.dropinInstance.teardown(function (teardownErr) {
                    if (teardownErr) {
                        console.error('Could not tear down Drop-in UI!');
                    } else {
                        console.info('Drop-in UI has been torn down!');
                    }
                });
            }
        },
        methods: {
            async takeToken() {
                try {
                    const response = await axios.get(`${this.urlBase}/api/orders/generate`)
                    // console.log(response);
                    this.tokenApi = response.data.takeToken;
                } catch(error) {
                    console.log(error);
                }
            },
            async createDropinInstance() {
                braintree.dropin.create({
                    authorization: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUzTWpFNU1qRTNNakVzSW1wMGFTSTZJams1TTJSaE9XUTBMVEpsTldNdE5EbGtOQzFoTjJVNExUa3hPR1UyWkRsaFpEaGxOaUlzSW5OMVlpSTZJbXMzTTNSa1ptWnRaREp4TXpsdGVtMGlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pYXpjemRHUm1abTFrTW5Fek9XMTZiU0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LjJhcnNHLTIzNndXWWd0LTg0UlNlVW1qdEQ0VjlxYVYzMVUxaHZrVXNHWlB3SDNwR1NJQU9XNnN0ekRVNkZvazlmXzI0aW5UcWZneWhIMkdjN0xrY0NBIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2s3M3RkZmZtZDJxMzltem0vY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZ2F0ZXcuY29tOjQ0My9tZXJjaGFudHMvazczdGRmZm1kMnEzOW16bS9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6Ims3M3RkZmZtZDJxMzltem0iLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2s3M3RkZmZtZDJxMzltem0ifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoiRGVsaXZlQm9vIiwiY2xpZW50SWQiOm51bGwsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoiZGVsaXZlYm9vIiwiY3VycmVuY3lJc29Db2RlIjoiRVVSIn19',
                    container: '#dropin-container'
                }, (createErr, instance) => {
                    if (createErr) {
                        console.error(createErr);
                        return;
                    }
                    this.dropinInstance = instance;
                });
            },
            handlePayment() {
                if (this.dropinInstance) {
                    this.dropinInstance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
                        if (requestPaymentMethodErr) {
                            console.error(requestPaymentMethodErr);
                            return;
                        }

                        axios.post('http://localhost:8000/api/orders/checkout', {
                            amount: 1,
                            paymentMethodNonce: fake-valid-mastercard-nonce,
                        })
                            .then(response => {
                                this.checkoutMessage = '<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>';
                                this.dropinInstance.teardown(teardownErr => {
                                    if (teardownErr) {
                                        console.error('Could not tear down Drop-in UI!');
                                    } else {
                                        console.info('Drop-in UI has been torn down!');
                                    }
                                });
                            })
                            .catch(error => {
                                this.checkoutMessage = '<h1>Error</h1><p>Check your console.</p>';
                                console.error(error);
                            });
                    });
                }
            }
        }
    };
</script>

<style scoped>
    .button {
        cursor: pointer;
        font-weight: 500;
        left: 3px;
        line-height: inherit;
        position: relative;
        text-decoration: none;
        text-align: center;
        border-style: solid;
        border-width: 1px;
        border-radius: 3px;
        /* -webkit-appearance: none;
        -moz-appearance: none; */
        display: inline-block;
    }

    .button--small {
        padding: 10px 20px;
        font-size: 0.875rem;
    }

    .button--green {
        outline: none;
        background-color: #64d18a;
        border-color: #64d18a;
        color: white;
        transition: all 200ms ease;
    }

    .button--green:hover {
        background-color: #8bdda8;
        color: white;
    }
</style>