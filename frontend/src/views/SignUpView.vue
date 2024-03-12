<template lang="">
    <div class="form">
        <h1>Sign Up</h1>
        <AddUser></AddUser>
    </div>
</template>
<script>
import AddUser from '../components/AddUser.vue'
export default {
    components:{
        AddUser
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