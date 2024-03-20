<template>
  <div>
    <Navabar></Navabar>
    <Footer></Footer>
  </div>
</template>

<style>
Navabar {
  margin-bottom: 10px;
}
</style>

<script>
import Navabar from './components/Navabar.vue';
import Footer from './components/Footer.vue';
export default {
  components: {
    Navabar,
    Footer,
  }
}
</script>
