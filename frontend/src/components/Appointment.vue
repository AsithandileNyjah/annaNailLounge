<template>
    <div>
      <div v-if="loading" class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else>
        <div class="moda text-center">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Make Appointment
          </button>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Set Up Appointment</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form class="row gy-2 gx-3 align-items-center">
                    <div class="col-auto">
                      <label class="visually-hidden" for="appDate">Date</label>
                      <input type="date" class="form-control" id="appDate" v-model="appDate" placeholder="10 Mar 2024">
                    </div>
                    <div class="col-auto">
                      <label class="visually-hidden" for="appTime">Time</label>
                      <input type="time" class="form-control" id="appTime" v-model="appTime" placeholder="13:30AM">
                    </div>
                    <div class="col-auto">
                      <label class="visually-hidden" for="addOns">Add-ons</label>
                      <input type="text" class="form-control" id="addOns" v-model="addOns" placeholder="Add ons">
                    </div>
                    <div class="col-auto">
                      <label class="visually-hidden" for="serviceSelect">Service</label>
                      <select class="form-select" id="serviceSelect" v-model="service">
                        <option v-for="service in services" :key="service.servID" :value="service.servName">{{ service.servName }}</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" @click="makeAppointment">Set Appointment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row container-fluid">
          <div class="col-md-4" v-for="service in services" :key="service.servName">
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
  import { mapState, mapActions } from 'vuex';
  export default {
    name: 'Display',
    data() {
      return {
        loading: false,
        appDate: '',
        appTime: '',
        addOns: '',
        service: '',
      };
    },
    computed: {
      ...mapState(['services', 'token'])
    },
    methods: {
      ...mapActions(['makeAppointment', 'fetchServices']),
      async makeAppointment() {
  try {
    await this.$store.dispatch('makeAppointment', {
      appDate: this.appDate,
      appTime: this.appTime,
      addOns: this.addOns,
      service: this.service
    });
    this.fetchServices();
    this.$emit('appointment-made');
  } catch (error) {
    console.error('Error making appointment:', error.message);
    this.$store.commit('SET_ERROR', error.message);
  }
}
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
.spinner-grow{
    margin-left: 50%;
    margin-right: 50%;
    margin-top: 20%;
}
.modal{
    background: none;
}
</style>