<template>
  <div>
    <div v-if="loading" class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else>
      <div class="row container-fluid">
        <div class="col-md-4" v-for="blog in blogs" :key="blog.blogID">
          <div class="card" style="width: 18rem;">
            <img :src="blog.blogCover" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ blog.blogTitle }}</h5>
              <p class="card-text">{{ blog.intro }}</p>
              <router-link @click="fetchBlog(blog.blogID)" :to="{ path:'/blogview/' + blog.blogID}" class="btn btn-primary">View Blog</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Blogs',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
  },
  created() {
    this.fetchBlogs();
  },
  methods: {
    async fetchBlogs() {
      this.loading = true;
      try {
        await this.$store.dispatch('fetchBlogs');
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      } finally {
        this.loading = false;
      }
    },
    async fetchBlog(blogID) {
      try {
        const response = await axios.get(`${baseURL}/blogs/${blogID}`);
        console.log(response);
        this.$store.commit('setBlogs', response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error.response.data);
        throw new Error('Failed to fetch blog. Please try again later.');
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
  font-weight: bold;
}
</style>
