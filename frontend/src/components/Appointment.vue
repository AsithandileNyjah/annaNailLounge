<template>
    <div>
        <button @click="makeAppointment">Make Appointment</button>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="appointments.length">
            <h2>Appointments</h2>
            <ul>
                <li v-for="(appointment, index) in appointments" :key="index">
                    {{ appointment }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState(['appointments', 'error']),
    },
    methods: {
        ...mapActions(['makeAppointment']),
    },
};
</script>
