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
                <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Read More
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ blog.blogTitle }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>{{ blog.pubDate }}</h6>
        <br>
        <h5>{{ blog.blogAuthor }}</h5>
        <br>
        {{ blog.blog }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
name: 'Blogs',
data(){
    return {
    loading: false,
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
    }finally {
        this.loading = false;
    }
    },
}
}

</script>
  

<style>
.error {
    color: red;
    font-weight: bold;
}
</style>
