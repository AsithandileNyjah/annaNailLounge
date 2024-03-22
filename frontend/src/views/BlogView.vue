<template>
    <div>
      <div v-if="loading" class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else>
        <div class="card">
          <img :src="blog.blogCover" class="card-img-top" alt="Blog Cover Image">
          <div class="card-body">
            <h5 class="card-title">{{ blog.blogTitle }}</h5>
            <p class="card-text">{{ blog.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'SingleBlogView',
    data() {
      return {
        loading: false,
        blog: null
      };
    },
    created() {
      this.fetchBlog();
    },
    methods: {
      ...mapActions(['fetchBlog']),
      async fetchBlog() {
        this.loading = true;
        try {
          const blogID = this.$route.params.blogID;
          await this.fetchBlog(blogID);
          this.blog = this.$store.state.blog;
        } catch (error) {
          console.error('Error fetching blog:', error.message);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style>
  .error {
    color: red;
    font-weight: bold;
  }
  </style>
  