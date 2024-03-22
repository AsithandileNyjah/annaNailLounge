import { createStore } from 'vuex'
import axios from 'axios'

import jwtDecode from 'jwt-decode'

import router from '../router'

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
  userRole: null,
  error:null,
  token: null
},
getters: {
},
mutations: {
  setUsers(state, users) {
    state.users = users;
  },
  setUserRole(state, role) {
    state.userRole = role;
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
    async fetchUserRole({ commit }) {
      try {
        const response = await fetch('/login');
        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }
        const data = await response.json();
        const userRole = data.result;
        console.log(userRole);
        commit('setUserRole', userRole);
      } catch (error) {
        console.error('Error fetching user role:', error);
        throw error;
      }
    },
async addService({ commit }, {servName, servDesc, servPrice, servPic}) {
  try {
    const serviceData = {servName, servDesc, servPrice, servPic};
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
async fetchUser({ commit }) {
  try {
    const response = await axios.get(`${baseURL}/users/${userID}`);
    commit('setUser', response.data);
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user. Please try again later.');
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
async deleteUser({ commit }, userID) {
  try {
    await axios.delete(`${baseURL}/users/${userID}`);
    commit('deleteUser', userID);
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
async editService({ commit }, { servID, updatedService }) {
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
      const responseData = await response.json();
      throw new Error("Failed to update service. Server responded with status: " + response.status + ". " + JSON.stringify(responseData));
    }
    commit("updatedService", updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    throw new Error("Failed to update service. Please try again later.");
  }
},
async makeAppointment({ commit }, { username, service, appDate, appTime, addOns }) {
  try {
    const token = $cookies.get('jwt');
    console.log('Token:', token);
    if (!token) {
      throw new Error('No token found');
    }
    
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);
    const username = payload.username;

    const appData = { username, service, appDate, appTime, addOns };
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
    commit('setBlogs', response.data);
  } catch (error) {
    console.error('Error fetching blogs:', error.response.data);
    throw new Error('Failed to fetch blogs. Please try again later.');
  }
},
async fetchBlog({ commit }, blogID) {
try {
  const response = await axios.get(`${baseURL}/blogs/${blogID}`);
  commit('setBlog', response.data); 
  console.log('Response:', response);
} catch (error) {
  console.error('Error fetching blog:', error.response.data);
  throw new Error('Failed to fetch blog. Please try again later.');
}
},
async createBlog({ commit }, blogData) {
try {
  const response = await axios.post(`${baseURL}/blogs`, blogData);
  commit('addBlog', response.data); 
  return response.data; 
} catch (error) {
  console.error('Error creating blog:', error);
  throw error; 
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
      await router.push('/')
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
},
async logout(context){
  let cookies = $cookies.keys()
  $cookies.remove('jwt')
  window.location.reload()
  await router.push('/sigin')
},
    },
modules: {
}
})