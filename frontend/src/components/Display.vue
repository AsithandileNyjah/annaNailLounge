<template>
    <div>
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Sort
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" @click="sortBy('price')">Sort by Price</a></li>
          <li><a class="dropdown-item" @click="sortBy('name')">Sort by Name</a></li>
        </ul>
      </div>
      <div v-if="loading" class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else>
        <div class="row container-fluid">
          <div class="col-md-4" v-for="service in sortedServices" :key="service.servID">
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
        loading: false,
        sortByOption: null
      };
    },
    computed: {
      services() {
        return this.$store.state.services;
      },
      sortedServices() {
        if (!this.sortByOption) return this.services;
        if (this.sortByOption === 'price') {
          return this.services.slice().sort((a, b) => a.servPrice - b.servPrice);
        } else if (this.sortByOption === 'name') {
          return this.services.slice().sort((a, b) => a.servName.localeCompare(b.servName));
        }
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
      sortBy(option) {
        this.sortByOption = option;
      },
    },
    created() {
      this.fetchServices();
    }
  };
  </script>
  
  <style>
  .card-img-top {
    height: 200px;
  }
  </style>
  