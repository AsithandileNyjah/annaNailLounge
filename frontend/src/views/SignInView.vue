<template lang="">
    <div class="form">
        <Signin></Signin>
    </div>
</template>
<script>
import Signin from '../components/Signin.vue'

export default {
    components:{
        Signin
    }
    
}
</script>
<style scoped>
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
}  
</style>