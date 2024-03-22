<template>
<div>
<form @submit.prevent="addBlog">
    <div class="mb-3">
    <label for="blogTitle" class="form-label">Blog Title</label>
    <input type="text" class="form-control" id="blogTitle" v-model="blogTitle" required>
    </div>
    <div class="mb-3">
    <label for="blogAuthor" class="form-label">Blog Author</label>
    <input type="text" class="form-control" id="blogAuthor" v-model="blogAuthor" required>
    </div>
    <div class="mb-3">
    <label for="intro" class="form-label">Introduction</label>
    <textarea class="form-control" id="intro" rows="3" v-model="intro" required></textarea>
    </div>
    <div class="mb-3">
    <label for="blog" class="form-label">Blog Content</label>
    <textarea class="form-control" id="blog" rows="6" v-model="blog" required></textarea>
    </div>
    <div class="mb-3">
    <label for="blogCover" class="form-label">Blog Cover Image URL</label>
    <input type="text" class="form-control" id="blogCover" v-model="blogCover" required>
    </div>
    <button type="submit" class="btn btn-primary">Add Blog</button>
</form>
</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
name: 'AddBlog',
data() {
return {
    blogTitle: '',
    blogAuthor: '',
    intro: '',
    blog: '',
    blogCover: ''
};
},
methods: {
async addBlog() {
    if (!this.blogTitle || !this.blogAuthor || !this.intro || !this.blog || !this.blogCover) {
    this.showErrorAlert('Please fill in all fields.');
    return;
    }
    const blogData = {
    blogTitle: this.blogTitle,
    blogAuthor: this.blogAuthor,
    intro: this.intro,
    blog: this.blog,
    blogCover: this.blogCover
    };
    this.$store.dispatch('createBlog', blogData);
},
showSuccessAlert(message) {
    Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message
    });
},
showErrorAlert(message) {
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message
    });
}
}
};
</script>

<style>
</style>
  
  