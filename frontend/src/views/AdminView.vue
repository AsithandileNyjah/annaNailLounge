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
            Column
        </div>
        </div>
    </div>
</template>

<script>
import Users from '../components/Users.vue'; // Assuming Users.vue is the file containing the Users component

export default {
  components: {
    Users // Register the Users component
  }
};
</script>

<style scoped>
/* Component-specific styles go here */
</style>
