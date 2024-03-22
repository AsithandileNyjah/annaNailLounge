<template>
<div>
<table class="table">
    <thead>
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Introduction</th>
        <th>Actions</th>
    </tr>
    </thead>
    <tbody v-if="!loading && blogs.length">
    <tr v-for="blog in blogs" :key="blog.blogID">
        <td>{{ blog.blogTitle }}</td>
        <td>{{ blog.blogAuthor }}</td>
        <td>{{ blog.intro }}</td>
        <td>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#editModal-' + blog.blogID">
            Edit
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="'editModal-' + blog.blogID" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Edit Blog</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <!-- Form for editing blog -->
                <div class="mb-3">
                    <label for="blogTitle" class="form-label">Title</label>
                    <input type="text" class="form-control" id="blogTitle" v-model="updatedBlog.blogTitle">
                </div>
                <div class="mb-3">
                    <label for="blogAuthor" class="form-label">Author</label>
                    <input type="text" class="form-control" id="blogAuthor" v-model="updatedBlog.blogAuthor">
                </div>
                <div class="mb-3">
                    <label for="intro" class="form-label">Introduction</label>
                    <textarea class="form-control" id="intro" rows="3" v-model="updatedBlog.intro"></textarea>
                </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="saveChanges(blog.blogID)">Save Changes</button>
                </div>
            </div>
            </div>
        </div>
        </td>
    </tr>
    </tbody>
    <tbody v-else>
    <tr>
        <td colspan="4" class="text-center">No blogs found.</td>
    </tr>
    </tbody>
</table>
<div v-if="loading" class="spinner-grow" role="status">
    <span class="visually-hidden">Loading...</span>
</div>
</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
name: 'BlogsView',
data() {
return {
    loading: false,
    updatedBlog: {
    blogTitle: null,
    blogAuthor: null,
    intro: null
    }
};
},
computed: {
blogs() {
    return this.$store.state.blogs;
}
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
async saveChanges(blogID) {
    try {
    await this.$store.dispatch('editBlog', { blogID, updatedBlog: this.updatedBlog });
    await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog successfully updated',
        timer: 1500
    });
    // Optionally, you can close the modal here
    // $(`#editModal-${blogID}`).modal('hide');
    } catch (error) {
    console.error('Error editing blog:', error.message);
    await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update blog'
    });
    }
}
}
};
</script>

<style>
</style>
  