import { createStore } from 'vuex'
import axios from 'axios'
const baseURL = 'https://annanaillounge-1.onrender.com'

export default createStore({
state: {
  users: [],
  services: [],
  blogs: [],
  reviews: [],
  comments: [],
  appointments: [],
  error:null,
},
getters: {
  isAdmin: state => state.isAdmin
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
  deleteService(state, servID) {
    state.services = state.services.filter(service => service.servID !== servID);
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
  setLogged(state,payload){
    state.loggedIn = payload
  },
},
actions: {
      async addUser({ commit }, userData) {
        try {
            const response = await fetch(`${baseURL}/users`, {
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
        console.log(userData);
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
  async fetchServices({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/services`);
      commit('setServices', response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      throw new Error('Failed to fetch services. Please try again later.');
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
    async deleteService({ commit }, servID) {
      try {
        await axios.delete(`${baseURL}/services/${servID}`);
        commit('deleteService', servID);
      } catch (error) {
        console.error('Error deleting service:', error.response.data);
        throw new Error('Failed to delete service. Please try again later.');
      }
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
  async editServ({ commit }, { servID, updatedService }) {
    try {
      const response = await fetch(
        `${baseURL}/services/${servID}`,
        {
          method: "PATCH", // Assuming PATCH method is used for partial updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedService),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update service");
      }
      
      commit("updatedService", updatedUser);
    } catch (error) {
      console.error("Error updating service:", error);
      throw new Error("Failed to update service. Please try again later.");
    }
  },
async makeAppointment({ commit }, appData) {
    try {
        const response = await axios.post(`${baseURL}/appointments`, appData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        commit('setAppointments', response.data);
    } catch (error) {
        commit('SET_ERROR', error.message);
    }
},

    async fetchBlogs({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/blogs`);
      console.log(response);
      commit('setBlogs', response.data);
      console.log(response.data);
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
  async checkUser({ commit }, { username, userPass }) {
    try {
      let userData = { username, userPass };
      console.log(userData);
      let response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();
      if (data && data.token) {
        $cookies.set('jwt', data.token);
        commit('setLogged', true);
        window.location.reload()
        
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }    
  }
    
    },
modules: {
}
})
