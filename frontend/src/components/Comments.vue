<template>
<div>
    <table class="table">
    <thead>
        <tr>
        <th>Comment ID</th>
        <th>Username</th>
        <th>Blog ID</th>
        <th>Comment</th>
        <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="comment in comments" :key="comment.commentID">
        <td>{{ comment.commentID }}</td>
        <td>{{ comment.username }}</td>
        <td>{{ comment.blogID }}</td>
        <td>{{ comment.comment }}</td>
        <td>
            <button @click="editComment(comment)" class="btn btn-primary">Edit</button>
            <button @click="deleteComment(comment.commentID)" class="btn btn-danger">Delete</button>
        </td>
        </tr>
    </tbody>
    </table>
</div>
</template>

<script>
import axios from 'axios';

export default {
name: 'Comments',
computed: {
    comments() {
    return this.$store.state.comments;
    }
},
methods: {
    async fetchComments() {
    try {
        const response = await axios.get(`${baseURL}/comments`);
        this.$store.commit('setComments', response.data);
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        throw new Error('Failed to fetch comments. Please try again later.');
    }
    },
    editComment(comment) {
    console.log('Edit comment:', comment);
    },
    async deleteComment(commentID) {
    try {
        await axios.delete(`${baseURL}/comments/${commentID}`);
        this.$store.commit('deleteComment', commentID);
        console.log('Comment deleted successfully.');
    } catch (error) {
        console.error('Error deleting comment:', error.message);
        throw new Error('Failed to delete comment. Please try again later.');
    }
    }
},
created() {
    this.fetchComments();
}
};
</script>

<style>
.table {
width: 100%;
border-collapse: collapse;
}

.table th,
.table td {
border: 1px solid #ddd;
padding: 8px;
}

.table th {
background-color: #f2f2f2;
text-align: left;
}

.table tbody tr:hover {
background-color: #f5f5f5;
}
</style>
  