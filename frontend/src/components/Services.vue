<template>
  <div>
    <div v-if="loading" class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Service Name</th>
            <th>Service Description</th>
            <th>Service Price</th>
            <th>Service Picture</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.servID">
            <td>{{ service.servID }}</td>
            <td>{{ service.servName }}</td>
            <td>{{ service.servDesc }}</td>
            <td>R{{ service.servPrice }}</td>
            <td><img :src="service.servPic" alt=""></td>
            <td>
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#ediMod-' + service.servID" @click="editedService(service)">
                Edit
              </button>

              <!-- Modal -->
              <div class="modal fade" :id="'ediMod-' + service.servID" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" :ref="'#ediMod-' + service.servID">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Edit Service</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <!-- Form for editing service -->
                      <div class="mb-3">
                        <label for="serviceName" class="form-label">Service Name</label>
                        <input type="text" class="form-control" id="serviceName" v-model="updatedService.servName">
                      </div>
                      <div class="mb-3">
                        <label for="serviceDesc" class="form-label">Service Description</label>
                        <input type="text" class="form-control" id="serviceDesc" v-model="updatedService.servDesc">
                      </div>
                      <div class="mb-3">
                        <label for="servicePrice" class="form-label">Service Price</label>
                        <input type="text" class="form-control" id="servicePrice" v-model="updatedService.servPrice">
                      </div>
                      <div class="mb-3">
                        <label for="servicePic" class="form-label">Service Picture</label>
                        <input type="text" class="form-control" id="servicePic" v-model="updatedService.servPic">
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" @click="saveChanges(servID)">Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <button type="button" class="btn btn-danger" @click="confirmDelete(service.servID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Services',
  data() {
    return {
      loading: false,
      updatedService: {
        servName: null,
        servDesc: null,
        servPrice: null,
        servPic: null,
      },
    };
  },
  computed: {
    services() {
      return this.$store.state.services;
    },
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
    async deleteService(servID) {
      try {
        await this.$store.dispatch('deleteService', servID);
      } catch (error) {
        console.error('Error deleting service:', error.message);
      }
    },
    async confirmDelete(servID) {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this service!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (confirmed.isConfirmed) {
        try {
          await this.$store.dispatch('deleteService', servID);
          Swal.fire(
            'Deleted!',
            'Your service has been deleted.',
            'success'
          );
        } catch (error) {
          Swal.fire(
            'Error!',
            'Failed to delete service. Please try again later.',
            'error'
          );
          console.error('Error deleting service:', error.message);
        }
      }
    },
    editedService(service) {
      this.updatedService = {
        servName: service.servName,
        servDesc: service.servDesc,
        servPrice: service.servPrice,
        servPic: service.servPic,
      };
    },
    async saveChanges(servID) {
      try {
        await this.$store.dispatch('editService', { servID, updatedService: this.updatedService });
      } catch (error) {
        console.error('Error updating service:', error.message);
      }
    },
  },
  created() {
    this.fetchServices();
  },
};
</script>
    
<style scoped>
table {
width: 100%;
border-collapse: collapse;
}

th, td {
border: 1px solid #dddddd;
text-align: left;
padding: 8px;
}

th {
background-color: #f2f2f2;
}

img{
    width: 100px;
    height: 100px;
}
</style>
