<template>
  <div id="app">
    <TheHeader />
    <h2>Welcome to my app!</h2>
    <router-view />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/LayoutComponent/TheHeader.vue';
import TheFooter from './components/LayoutComponent/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style></style>
