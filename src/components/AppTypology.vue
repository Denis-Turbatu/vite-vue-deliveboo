<script>
export default {
  props: {
    typologyObject: Object,
  },
};
</script>

<template>
  <div class="p-1 d-flex justify-content-center">
    <button class="btn btn-outline-danger custom-button-typology  d-flex align-items-center">
      <img :src="typologyObject.icon" class="custom-icon-class" alt="Typology Icon" />
      <span class="ms-text">{{ typologyObject.name }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.custom-button-typology {
  width: 150px;
  height: 50px;
  background-color: #ffffff; /* Sfondo bianco di default */
  border: 1px solid #dc3545; /* Colore del bordo di default per btn-outline-danger */
  color: #dc3545; /* Colore del testo di default */
}

.custom-button-typology:hover {
  background-color: #dc3545; 
  color: #ffffff; 
}

.custom-icon-class {
  width: 20%;
  height: 20px;
}

.ms-text {
  width: 80%;
  font-size: 1rem;
  font-weight: bold;
  padding-left: 2px;
}
</style>

