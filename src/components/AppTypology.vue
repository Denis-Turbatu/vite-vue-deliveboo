<script>
export default {
  props: {
    typologyObject: Object,
  },
};
</script>

<template>
  <div class="p-1 d-flex justify-content-center ">
    <button class="btn btn-warning custom-button-typology text-white">
      <img src="" class="" alt="" />
      <span class="">{{ typologyObject.name }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.custom-button-typology  {
  width: 150px;
  height: 50px; 
}
</style>
