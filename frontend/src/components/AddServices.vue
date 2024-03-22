<template>
<div>
    <div class="mb-3">
    <label for="servName" class="form-label">Service Name</label>
    <input v-model="servName" type="text" class="form-control" id="servName" placeholder="Service Name">
    </div>
    <div class="mb-3">
    <label for="servDesc" class="form-label">Service Description</label>
    <textarea v-model="servDesc" class="form-control" id="servDesc" rows="3" placeholder="Service Description"></textarea>
    </div>
    <div class="mb-3">
    <label for="servPrice" class="form-label">Service Price</label>
    <input v-model="servPrice" type="number" class="form-control" id="servPrice" placeholder="Service Price">
    </div>
    <div class="mb-3">
    <label for="servPic" class="form-label">Service Picture URL</label>
    <input v-model="servPic" type="text" class="form-control" id="servPic" placeholder="Service Picture URL">
    </div>
    <button @click="addService" class="btn btn-primary">Add Service</button>
</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
name: 'AddServices',
data() {
    return {
    servName: '',
    servDesc: '',
    servPrice: '',
    servPic: ''
    };
},
methods: {
    async addService() {
    if (!this.servName || !this.servDesc || !this.servPrice || !this.servPic) {
        this.showErrorAlert('Please fill in all fields.');
        return;
    }

    const serviceData = {
        servName: this.servName,
        servDesc: this.servDesc,
        servPrice: this.servPrice,
        servPic: this.servPic
    };

    try {
        const response = await fetch(`${baseURL}/services`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
        });

        const data = await response.json();
        if (response.ok) {
        this.$store.commit('setServices', data);
        this.showSuccessAlert('Service added successfully.');
        this.clearFields();
        } else {
        this.showErrorAlert(data.error);
        }
    } catch (error) {
        console.error('Error creating service:', error);
        this.showErrorAlert('An error occurred while creating the service.');
    }
    },
    showSuccessAlert(message) {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message
    });
    },
    showErrorAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    });
    },
    clearFields() {
    this.servName = '';
    this.servDesc = '';
    this.servPrice = '';
    this.servPic = '';
    }
}
};
</script>

<style>
</style>
  