<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link v-if="isAdmin"  to="/admin">Admin</router-link> |
    <router-link to="/appointments">Appointments</router-link> |
    <router-link v-if="!$cookies.get('jwt')" to="/signup">Sign Up</router-link> |
    <router-link v-if="!$cookies.get('jwt')" to="/signin">Sign In</router-link> |
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAdmin'])
  },
  mounted() {
    this.fetchAdminRights('username'); // Replace 'username' with actual username
  },
  methods: {
    async fetchAdminRights(username) {
      await this.$store.dispatch('fetchAdminRights', username);
    }
  }
};
</script>