<template>
    <div class="container">
        <h1>Users</h1>
        <h1>Add A User</h1>
        <AddUser></AddUser>
        <Users></Users>
        <br>
         <h1>Services</h1>
         <h2>Add Services</h2>
         <AddServices></AddServices>
        <Services></Services>
        <br>
        <Comments></Comments>
        <br>
        <h1>Blogs</h1>
        <AddBlog></AddBlog>
        <BlogsView></BlogsView>

    </div>
</template>

<script>
import Users from '../components/Users.vue';
import AddUser from '../components/AddUser.vue';
import Services from '../components/Services.vue';
import AddServices from '../components/AddServices.vue';
import Comments from '../components/Comments.vue';
import AddBlog from '../components/AddBlog.vue';
import BlogsView from '../components/BlogsView.vue'

export default {
  components: {
    Users,
    AddUser,
    Services,
    AddServices,
    Comments,
    AddBlog,
    BlogsView

  }
};
</script>

<style scoped>
</style>
