<script>
import AppHeader from './components/AppHeader.vue';
import ChatApp from './components/ChatApp.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    ChatApp,
    AppFooter,
  }
}
</script>

<template>
  <div>
    <AppHeader />
    <router-view></router-view>
    <AppFooter />
  </div>
  <ChatApp />
</template>

<style lang="scss"></style>