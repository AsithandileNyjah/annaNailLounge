<template>
    <div>
        <div v-if="loading" class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else>
        <div class="row container-fluid">
            <div class="col-md-4" v-for="service in services" :key="service.servID">
            <div class="card" style="width: 18rem;">
                <img :src="service.servPic" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">{{ service.servName }}</h5>
                <p class="card-text">{{ service.servDesc }}</p>
                <button class="btn btn-primary">R{{service.servPrice}}</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
  

<script>
export default {
name: 'Display',
data() {
    return {
    loading: false
    };
},
computed: {
    services() {
    return this.$store.state.services;
    }
},
methods: {
    async fetchServices() {
    this.loading = true;
    try {
        await this.$store.dispatch('fetchServices');
    } catch (error) {
        console.error('Error fetching services:', error.message);
    } finally {
        this.loading = false;
    }
    },
},
created() {
    this.fetchServices();
}
};
</script>



<style>
.card-img-top{
    height: 200px;
}
</style>