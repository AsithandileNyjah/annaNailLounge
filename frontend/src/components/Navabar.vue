<template>
    <div>
      <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <div class="container-fluid bg-dark">
          <a class="navbar-brand bg-dark" href="/"><img  class="logo bg-dark" src="https://cdn-thumbs.imagevenue.com/67/ac/2c/ME17RU92_t.png" alt=""></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon bg-dark"></span>
          </button>
          <div class="collapse navbar-collapse bg-dark " id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/" class="nav-link bg-dark">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link bg-dark">About</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/catalog" class="nav-link bg-dark">Catalog</router-link>
              </li>
              <li class="nav-item" v-if="$cookies.get('jwt')">
                <router-link to="/admin" class="nav-link bg-dark">Admin</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/appointments" class="nav-link bg-dark">Appointments</router-link>
              </li>
              <li class="nav-item" v-if="!$cookies.get('jwt')">
                <router-link to="/signup" class="nav-link bg-dark">Sign Up</router-link>
              </li>
              <li class="nav-item" v-if="!$cookies.get('jwt')">
                <router-link to="/signin" class="nav-link bg-dark">Sign In</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/blogs" class="nav-link bg-dark">Blogs</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/contact" class="nav-link bg-dark">Contact Us</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <router-view/>
    </div>
  </template>
  
<script>
export default {
    name: 'Navbar'
}
</script>
<style>
.logo {
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.logo {
    height: 50px;
    border-radius: 50%;
}

.collapse{
    margin-left: 60%;
}
</style>