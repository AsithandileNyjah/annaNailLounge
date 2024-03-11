<template>
<div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Make An Appointment
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Select Time & Date</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
            <div class="col" v-for="date in dates" :key="date">
                <h4>{{ date }}</h4>
                <div class="btn-group-vertical">
                <button v-for="time in timeSlots" :key="time" class="btn btn-outline-primary">{{ time }}</button>
                </div>
            </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-secondary" @click="makeAppointment(date, time)">Make Appointment</button> <!-- Fix typo here -->
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
data() {
    return {
    dates: [],
    timeSlots: [],
    };
},
mounted() {
    this.generateDates();
    this.generateTimeSlots();
},
methods: {
    async makeAppointment(date, time) {
    try {
        const response = await axios.post(`${baseURL}/appointments`);
        this.$emit('appointment-made', response.data); // Emit event to parent component if needed
        console.log('Appointment made successfully');
    } catch (error) {
        console.error('Error making appointment:', error.message);
        // Handle error if needed
    }
    },
    generateDates() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        this.dates.push(date.toDateString());
    }
    },
    generateTimeSlots() {
    for (let hour = 8; hour < 17; hour++) {
        this.timeSlots.push(`${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`);
    }
    },
},
};
</script>

<style scoped>

</style>
  