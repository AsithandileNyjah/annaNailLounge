<template>
    <div class="container">
        <div class="row">
        <div class="col">
            <Users></Users>
        </div>
        <div class="col">
            Column
        </div>
        <div class="col">
            <AddUser></AddUser>
        </div>
        </div>
    </div>
</template>

<script>
import Users from '../components/Users.vue';
import AddUser from '../components/AddUser.vue'

export default {
  components: {
    Users,
    AddUser
  }
};
</script>

<style scoped>
/* Component-specific styles go here */
</style>
