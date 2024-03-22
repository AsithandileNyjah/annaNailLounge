<template>
<div class="container">
    <div class="row">
    <div class="col-md-9">
        <div class="welcome-text">
        <h2>Welcome to Anna Nail Lounge</h2>
        </div>
    </div>
    </div>
    <div class="row">
    <div class="col">
        <div class="animation-text">
        <p class="typed-text">{{ typedMessage }}</p>
        <br>
        <h2>For Our Exceptional Service</h2>
        <br>
        <router-link to="/appointments" class="btn-appointments">Make an Appointment</router-link>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
name: 'LandingPage',
data() {
    return {
    message: "Where beauty meets relaxation. Step into our sanctuary of pampering and let our skilled technicians transform your nails into works of art. Whether you're seeking a classic manicure, intricate nail design, or indulgent spa pedicure, we're here to exceed your expectations. Sit back, unwind, and let us elevate your nail care experience to new heights. Welcome to a world of exquisite beauty at Anna Nail Lounge.",
    typedMessage: ''
    };
},
mounted() {
    this.typeMessage();
},
methods: {
    typeMessage() {
    let i = 0;
    const speed = 25;
    const timer = setInterval(() => {
        if (i < this.message.length) {
        this.typedMessage += this.message.charAt(i);
        i++;
        } else {
        clearInterval(timer);
        }
    }, speed);
    }
}
};
</script>

<style>
.container {
padding-top: 50px;
background-attachment: fixed;
background-attachment: src="https://cdn-thumbs.imagevenue.com/f0/7d/86/ME17UD9C_t.jpg"
}

.welcome-text {
margin-bottom: 30px;
}

.btn-appointments {
display: inline-block;
padding: 10px 20px;
background-color: rgb(252, 142, 160);
color: #fff;
text-decoration: none;
border-radius: 5px;
transition: all 0.3s ease;
}

.btn-appointments:hover {
background-color: #cc0000;
}

.center-image {
display: block;
margin: 0 auto;
height: 400px;
width: 400px;
}

.animation-text {
margin-top: 20px;
}

.typed-text {
border-right: 2px solid #000;
margin: 0;
padding-right: 10px;
animation: typing 3s steps(40, end);
}

@keyframes typing {
from { width: 0 }
to { width: 100% }
}
</style>
    
  