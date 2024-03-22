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
              <router-link @click="fetchBlog(blog.blogID)" :to="{name:'blogview', params:{blogID: blog.blogID}}" class="btn btn-primary">View Blog</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    ...mapActions(['fetchBlogs', 'setBlog']),
    async fetchBlog(blogID) {
      try {
        await this.fetchBlog(blogID);
      } catch (error) {
        console.error('Error fetching blog:', error.message);
      }
    }
  },
};
</script>

<style>
.error {
  color: red;
  font-weight: bold;
}
</style>