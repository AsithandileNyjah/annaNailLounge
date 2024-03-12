<template>
    <div>
        <p>
  <a v-for="blog in blogs" :key="blog.blogID" class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    {{ blog.blogTitle }}
  </a>
</p>
<div v-for="blog in blogs" :key="blog.blogID" class="collapse" id="collapseExample">
  <div class="card card-body">
    {{ blog.blog }}
  </div>
</div>
    </div>
</template>

<script>
export default {
name: 'Blogs',
data() {
    return {
    blogs: []
    };
},
created() {
    return this.fetchBlogs();
},
computed: {
    blogs() {
    return this.$store.state.blogs;
    },
},
methods: {
    async fetchBlogs() {
    try {
        await this.$store.dispatch('fetchBlogs');
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        this.error = ('Failed to fetch blogs. Please try again later.');
    }
    }
}
}

</script>
  

<style>
.error {
    color: red;
    font-weight: bold;
}
</style>
