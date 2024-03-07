<template lang="">
    <div class="form">
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