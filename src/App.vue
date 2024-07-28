<script>
  import AppHeader from './components/AppHeader.vue';
import ChatApp from './components/ChatApp.vue';

export default {
  components: {
    AppHeader,
    ChatApp
  }
}
</script>

<template >
  <div>
    <AppHeader/>
    <router-view></router-view>
  </div>
  <ChatApp/>
</template>

<style lang="scss">
  
</style>