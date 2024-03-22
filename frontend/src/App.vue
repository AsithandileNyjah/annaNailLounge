<template>
  <div class="page">
    <Navabar></Navabar>
    
    <Footer></Footer>
  </div>
</template>

<style>
Navabar {
  margin-bottom: 10px;
  margin-top: 100vh;
}
.page{
  background-size: cover;
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
