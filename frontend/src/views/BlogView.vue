<template>
  <div>
    <div v-if="loading" class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else>
      <div class="card" v-if="blog" :key="blog.blogID">
        <img :src="blog.blogCover" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{ blog.blogTitle }}</h5>
          <p class="card-text">{{ blog.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BlogView',
  created() {
    this.fetchBlog()
  },
  computed: {
    ...mapState(['blog', 'loading']), 
  },
  methods: {
    ...mapActions(['fetchBlog']),
  },
};
</script>
