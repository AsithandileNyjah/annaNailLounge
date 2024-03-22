<template>
<div class="container">
    <h1 class="top">Contact Us</h1>
    <div class="row">
    <div class="col-md-6">
        <div class="mb-3">
        <label for="fullname" class="form-label">Full Name</label>
        <input v-model="fullname" type="text" class="form-control" id="fullname" placeholder="John Doe">
        </div>
        <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com">
        </div>
        <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea v-model="message" class="form-control" id="message" rows="3"></textarea>
        </div>
        <button @click="submitForm" class="btn btn-primary">Send Message</button>
    </div>
    <div class="col-md-6">
        <div class="contact-info">
        <h3>Contact Information</h3>
        <p><strong>Address:</strong> 314 Imam Haron Road, Lansdowne, 7081</p>
        <p><strong>Email:</strong> info@annanaillounge.com</p>
        <p><strong>Phone:</strong> +27 899 3523</p>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
data() {
    return {
    fullname: '',
    email: '',
    message: ''
    };
},
computed: {
    isFormValid() {
    return this.fullname && this.email && this.message;
    }
},
methods: {
    submitForm() {
    if (this.isFormValid) {
        console.log('Full Name:', this.fullname);
        console.log('Email:', this.email);
        console.log('Message:', this.message);
        this.showSuccessAlert();
        this.fullname = '';
        this.email = '';
        this.message = '';
    } else {
        this.showErrorAlert('Please fill in all fields.');
    }
    },
    showSuccessAlert() {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your message has been sent successfully.'
    });
    },
    showErrorAlert(errorMessage) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage
    });
    }
}
};
</script>

<style scoped>
.top{
    text-align: center;
}
.contact-info {
margin-top: 35px ;
background-color: #f9f9f9;
padding: 20px;
border-radius: 5px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.contact-info h3 {
margin-bottom: 10px;
}

.contact-info p {
margin-bottom: 5px;
}
</style>
  