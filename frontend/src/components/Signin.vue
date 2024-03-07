<template>
    <div>
        <form @submit.prevent="checkUser">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="userPass" required>
            </div>
            <button type="submit" class="btn btn-primary">Log In</button>
        </form>
    </div>
</template>

<script>
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
            try {
                await this.$store.dispatch('checkUser', { username: this.username, userPass: this.userPass });
            } catch (error) {
                console.error('Login failed:', error.message);
                // Handle the error as needed
            }
        }
    }
}
</script>


<style>
</style>
