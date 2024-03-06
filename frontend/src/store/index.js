import { createStore } from 'vuex'
import axios from 'axios'
const baseURL = 'https://annanaillounge.onrender.com'

export default createStore({
state: {
  users: [],
  services: [],
  blogs: [],
  reviews: [],
  comments: [],
  appointments: [],
  error:null
},
getters: {
},
mutations: {
  setUsers(state, users) {
    state.users = users;
  },
  deleteUser(state, userId) {
    state.users = state.users.filter(user => user.userId !== userId);
  },
  setServices(state, services) {
    state.services = services;
  },
  setBlogs(state, blogs) {
    state.blogs = blogs;
  },
  setReviews(state, reviews) {
    state.reviews = reviews;
  },
  setComments(state, comments) {
    state.comments = comments;
  },
  setAppointments(state, appointments) {
    state.appointments = appointments;
  },
  SET_ERROR(state, error) {
    state.error = error;
},
  updateUser(state, updatedUser) {
    state.users = state.users.map((user) => {
      if (user.userID === updatedUser.userID) {
        return updatedUser;
      }
      return user;
    });
  },
},
actions: {
      async createUser({ commit }, userData) {
        try {
            const response = await fetch('/api/addOne', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                commit('setUser', data);
            } else {
                commit('setError', data.error);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            commit('setError', 'An error occurred while creating the user.');
        }
    },
  async fetchUsers({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/users`);
      commit('setUsers', response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users. Please try again later.');
    }
  },
  async deleteUser({ commit }, userId) {
    try {
      await axios.delete(`${baseURL}/users/${userId}`);
      commit('deleteUser', userId);
    } catch (error) {
      console.error('Error deleting user:', error.response.data);
      throw new Error('Failed to delete user. Please try again later.');
    }
    window.location.reload()
  },
  async editUser({ commit }, { userID, updatedUser }) {
    try {
      const response = await fetch(
        `${baseURL}/users/${userID}`,
        {
          method: "PATCH", // Assuming PATCH method is used for partial updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      
      commit("updateUser", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user. Please try again later.");
    }
  },
  async makeAppointment({ commit }) {
    try {
        const response = await axios.post(`${baseURL}/appointments`);
        commit('setAppointments', response.data);
    } catch (error) {
        commit('SET_ERROR', error.message);
    }
},
    async fetchBlogs({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/blogs`);
      commit('setBlogs', response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error.response.data);
      throw new Error('Failed to fetch blogs. Please try again later.');
    }
  },
  async fetchReviews({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/reviews`);
      commit('setReviews', response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error.response.data);
      throw new Error('Failed to fetch reviews. Please try again later.');
    }
  },
  async fetchComments({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/comments`);
      commit('setComments', response.data);
    } catch (error) {
      console.error('Error fetching comments:', error.response.data);
      throw new Error('Failed to fetch comments. Please try again later.');
    }
  },
  async fetchAppointments({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/appointments`);
      commit('setAppointments', response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error.response.data);
      throw new Error('Failed to fetch appointments. Please try again later.');
    }
  },
},
modules: {
}
})
