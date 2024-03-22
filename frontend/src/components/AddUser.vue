<template>
    <div>
        <h1>Sign Up</h1>
        <div v-if="loading" class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else>
            <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" v-model="user.firstName" required>
            </div>
            <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" v-model="user.lastName" required>
            </div>
            <div class="mb-3">
                <label for="emailAddress" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="emailAddress" v-model="user.emailAdd" required>
            </div>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="user.username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="user.userPass" required>
            </div>
            <button type="button" class="btn btn-primary" @click="registerUser">Sign Up</button>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'AddUser',
    data() {
        return {
            user: {
                firstName: null,
                lastName: null,
                emailAdd: null,
                username: null,
                userPass: null
            },
            loading: false // Add loading state
        };
    },
    methods: {
        async registerUser() {
            // Validate form fields
            if (!this.user.firstName || !this.user.lastName || !this.user.emailAdd || !this.user.username || !this.user.userPass) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill in all fields'
                });
                return;
            }

            try {
                this.loading = true;
                await this.$store.dispatch('addUser', this.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User created successfully'
                });
            } catch (error) {
                console.error('Error registering user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to register user. Please try again later.'
                });
            } finally {
                this.loading = false; 
            }
        }
    }
};
</script>
