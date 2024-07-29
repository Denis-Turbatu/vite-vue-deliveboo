<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            currentYear: new Date().getFullYear()
        };
    }
}
</script>

<template>
    <footer class="app-footer bg-dark text-white py-4">
        <div class="container">
            <div class="text-center mb-4">
                <p class="mb-2">&copy; {{ currentYear }} DeliveBoo. Tutti i diritti riservati.</p>
                <p class="mb-1">DeliveBoo S.r.l.</p>
                <p class="mb-0">
                    <a href="/privacy-policy" class="text-white" aria-label="Privacy Policy">Privacy Policy</a> |
                    <a href="/terms-of-service" class="text-white" aria-label="Termini di servizio">Termini di
                        servizio</a>
                </p>
            </div>
            <div class="row">
                <!-- Lista Indirizzi -->
                <div class="col-md-4">
                    <h3 class="mt-3 mb-4">Indirizzi</h3>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <p class="h5">Indirizzo</p>
                            <p>Via Monte Napoleone 8, 20121 Milano (MI), Italia</p>
                        </li>
                        <li class="mb-2">
                            <p class="h5">Telefono</p>
                            <p>+39 02 55501234</p>
                        </li>
                        <li class="mb-2">
                            <p class="h5">Email</p>
                            <p><a href="mailto:info@deliveboo.it" class="text-white"
                                    aria-label="Email info@deliveboo.it">info@deliveboo.it</a></p>
                        </li>
                    </ul>
                </div>

                <!-- Lista Servizi -->
                <div class="col-md-4">
                    <h3 class="mt-3 mb-4">Servizi</h3>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a href="/carrello" class="text-white" aria-label="Carrello">Carrello</a>
                        </li>
                        <li class="mb-2">
                            <a href="/contattaci" class="text-white" aria-label="Contattaci">Contattaci</a>
                        </li>
                        <li class="mb-2">
                            <a href="http://localhost:8000/" class="text-white" aria-label="Lavora con noi">Lavora con
                                noi</a>
                        </li>
                    </ul>
                </div>

                <!-- Lista Profili -->
                <div class="col-md-4">
                    <h3 class="mt-3 mb-4">I nostri profili</h3>
                    <ul class="list-unstyled">
                        <!-- Omar Ndiaye -->
                        <li class="mb-3">
                            <p class="h5">Omar Ndiaye</p>
                            <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer"
                                class="text-white me-2" aria-label="LinkedIn Omar Ndiaye">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
                                class="text-white" aria-label="GitHub Omar Ndiaye">
                                <i class="fab fa-github"></i>
                            </a>
                        </li>

                        <!-- Denis Turbatu -->
                        <li class="mb-3">
                            <p class="h5">Denis Turbatu</p>
                            <a href="https://www.linkedin.com/in/" target="_blank"
                                rel="noopener noreferrer" class="text-white me-2" aria-label="LinkedIn Denis Turbatu">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
                                class="text-white" aria-label="GitHub Denis Turbatu">
                                <i class="fab fa-github"></i>
                            </a>
                        </li>

                        <!-- Gessica Calcagno -->
                        <li class="mb-3">
                            <p class="h5">Gessica Calcagno</p>
                            <a href="https://www.linkedin.com/in/" target="_blank"
                                rel="noopener noreferrer" class="text-white me-2"
                                aria-label="LinkedIn Gessica Calcagno">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
                                class="text-white" aria-label="GitHub Gessica Calcagno">
                                <i class="fab fa-github"></i>
                            </a>
                        </li>

                        <!-- Constantin Renato Irina -->
                        <li class="mb-3">
                            <p class="h5">Constantin Renato Irina</p>
                            <a href="https://www.linkedin.com/in/constantin-renato-irina" target="_blank"
                                rel="noopener noreferrer" class="text-white me-2"
                                aria-label="LinkedIn Constantin Renato Irina">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/renatoirina" target="_blank" rel="noopener noreferrer"
                                class="text-white" aria-label="GitHub Constantin Renato Irina">
                                <i class="fab fa-github"></i>
                            </a>
                        </li>

                        <!-- Matteo Cenci -->
                        <li class="mb-3">
                            <p class="h5">Matteo Cenci</p>
                            <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer"
                                class="text-white me-2" aria-label="LinkedIn Matteo Cenci">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
                                class="text-white" aria-label="GitHub Matteo Cenci">
                                <i class="fab fa-github"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.app-footer {
    background-color: #343a40;
    color: #ffffff;
}

.app-footer a {
    text-decoration: none;
}

.app-footer a:hover {
    text-decoration: underline;
}

.app-footer i {
    font-size: 1.5rem;
}

.app-footer .h5 {
    margin-bottom: 0.5rem;
}

.app-footer ul {
    padding: 0;
    list-style: none;
}

.app-footer .col-md-4 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.app-footer .list-unstyled {
    margin-bottom: 0;
}
</style>
