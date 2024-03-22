<template>
<div class="login-container">
    <form @submit.prevent="checkUser" class="login-form">
    <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="userPass" required>
    </div>
    <button type="submit" class="btn btn-primary" v-if="!$cookies.get('jwt')">Log In</button>
    <p class="signup-link">Don't have an account? <router-link to="/signup" class="nav-link bg-dark">Sign Up</router-link></p>
    </form>
</div>
</template>

<style>
.login-container {
max-width: 400px;
margin: 0 auto;
}

.login-form {
background-color: #f9f9f9;
padding: 20px;
border-radius: 5px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
margin-bottom: 20px;
}

label {
font-weight: bold;
}

input[type="text"],
input[type="password"] {
width: 100%;
padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
}

.btn-primary {
width: 100%;
padding: 10px;
border: none;
border-radius: 4px;
background-color: #007bff;
color: #fff;
cursor: pointer;
}

.btn-primary:hover {
background-color: #0056b3;
}

.signup-link {
margin-top: 10px;
font-size: 14px;
}

.signup-link a {
color: #007bff;
}
</style>
  

<script>
import Swal from 'sweetalert2';

export default {
    name: 'Signin',
    data() {
        return {
            username: '',
            userPass: ''
        };
    },
    methods: {
        async checkUser() {
            // Validate form fields
            if (!this.username || !this.userPass) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill in both username and password'
                });
                return;
            }

            try {
                await this.$store.dispatch('checkUser', { username: this.username, userPass: this.userPass });
            } catch (error) {
                console.error('Login failed:', error.message);
            }
        }
    }
}
</script>

