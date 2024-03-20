<template>
    <div class="container">
        <h1>Users</h1>
        <h1>Add A User</h1>
        <AddUser></AddUser>
        <Users></Users>
        <br>
         <h1>Services</h1>
        <Services></Services>
        <br>

    </div>
</template>

<script>
import Users from '../components/Users.vue';
import AddUser from '../components/AddUser.vue'
import Services from '../components/Services.vue';

export default {
  components: {
    Users,
    AddUser,
    Services
  }
};
</script>

<style scoped>
</style>
