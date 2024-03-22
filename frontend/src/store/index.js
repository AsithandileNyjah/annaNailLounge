import { createStore } from 'vuex'
import axios from 'axios'

import jwtDecode from 'jwt-decode'

const baseURL = 'https://annanaillounge.onrender.com'

export default createStore({
state: {
  users: [],
  services: [],
  blogs: [],
  blog:[],
  reviews: [],
  comments: [],
  appointments: [],
  error:null,
  token: null
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
  setBlog(state, blog) {
    state.blog = blog;
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
          async addService({ commit }, serviceData) {
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
                commit('setService', data);
              } else {
                commit('setError', data.error);
              }
            } catch (error) {
              console.error('Error creating service:', error);
              commit('setError', 'An error occurred while creating the service.');
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
          method: "PATCH",
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
          method: "PATCH", 
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
  async makeAppointment({ commit }, { appDate, appTime, addOns, service }) {
    try {
      const token = $cookies.get('jwt');
      console.log('Token:', token);
      if (!token) {
        throw new Error('No token found');
      }
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;
      console.log('Username:', username)
      const appData = { appDate, appTime, addOns, service, username };
      console.log('App Data:', appData);
      const response = await axios.post(`${baseURL}/appointments`, appData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });
      commit('setAppointments', response.data);
    } catch (error) {
      console.error('Error making appointment:', error);
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
  async fetchBlog(blogID) {
    try {
      const response = await axios.get(`${baseURL}/blogs/${blogID}`);
      console.log(response);
      if (response && response.data) {
        this.$store.commit('setBlogs', response.data);
        console.log(response.data);
      } else {
        throw new Error('Failed to fetch blog data.');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw new Error('Failed to fetch blog. Please try again later.');
    }
  }, 
    async createBlog({ commit }, blogData) {
      try {
        const response = await axios.post(`${baseURL}/blogs`, blogData);
  
        if (response.status === 200) {
          this.showSuccessAlert('Blog created successfully.');
        } else {
          this.showErrorAlert('Failed to create blog. Please try again later.');
        }
      } catch (error) {
        console.error('Error creating blog:', error);
        
        this.showErrorAlert('An error occurred while creating the blog.');
      } 
    },
    async editBlog({ commit }, payload) {
      try {
        const { blogID, blogTitle, blogAuthor, intro, blog, blogCover } = payload;
        const editedBlog = await getBlog(blogID);
        const updatedBlogTitle = blogTitle ? blogTitle : editedBlog.blogTitle;
        const updatedBlogAuthor = blogAuthor ? blogAuthor : editedBlog.blogAuthor;
        const updatedIntro = intro ? intro : editedBlog.intro;
        const updatedBlog = blog ? blog : editedBlog.blog;
        const updatedBlogCover = blogCover ? blogCover : editedBlog.blogCover;
        await editBlog(updatedBlogTitle, updatedBlogAuthor, updatedIntro, updatedBlog, updatedBlogCover, blogID);
  
        commit('UPDATE_BLOG', {
          id: blogID,
          blogTitle: updatedBlogTitle,
          blogAuthor: updatedBlogAuthor,
          intro: updatedIntro,
          blog: updatedBlog,
          blogCover: updatedBlogCover
        });
        return { success: true, msg: "Blog successfully updated" };
      } catch (error) {
        console.error("Error editing blog:", error);
        return { success: false, msg: "Failed to update blog" };
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
  async fetchComments() {
    try {
      const response = await axios.get(`${baseURL}/comments`);
      this.$store.commit('setComments', response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
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
      let response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
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