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
                <button class="btn btn-primary">Read</button>
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
