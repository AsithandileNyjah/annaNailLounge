<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/admin">Admin</router-link> |
    <router-link to="/appointments">Appointments</router-link> |
    <!-- Button trigger modal -->
<a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Sign Up
</a>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
                          <label for="firstName" class="form-label">First Name</label>
                          <input type="text" class="form-control" id="firstName" v-model="user.firstName">
                        </div>
                        <div class="mb-3">
                          <label for="lastName" class="form-label">Last Name</label>
                          <input type="text" class="form-control" id="lastName" v-model="user.lastName">
                        </div>
                        <div class="mb-3">
                          <label for="lastName" class="form-label">Email Address</label>
                          <input type="text" class="form-control" id="lastName" v-model="user.emailAdd">
                        </div>
                        <div class="mb-3">
                          <label for="lastName" class="form-label">Username</label>
                          <input type="text" class="form-control" id="lastName" v-model="user.username">
                        </div>
                        <div class="mb-3">
                          <label for="lastName" class="form-label">Password</label>
                          <input type="text" class="form-control" id="lastName" v-model="user.userPass">
                        </div>
                      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="registerUser">Save changes</button>
      </div>
    </div>
  </div>
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
export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        emailAdd: '',
        username: '',
        userPass: ''
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        await this.$store.dispatch('createUser', this.user);
        // Handle successful registration, maybe redirect the user
        console.log('User created successfully');
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle error, maybe display error message to the user
      }
    }
  }
};
</script>
