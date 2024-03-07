<template>
    <div>
      <h2>Users</h2>
      <div v-if="loading" class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Username</th>
              <th>User Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.userID">
              <td>{{ user.userID }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.emailAdd }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.userRole }}</td>
              <td>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#editModal-' + user.userID" @click="editUser(user)">
                  Edit
                </button>
  
                <!-- Modal -->
                <div class="modal fade" :id="'editModal-' + user.userID" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="editModal-{{ user.userID }}">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <!-- Form for editing user -->
                        <div class="mb-3">
                          <label for="firstName" class="form-label">First Name</label>
                          <input type="text" class="form-control" id="firstName" v-model="updatedUser.firstName">
                        </div>
                        <div class="mb-3">
                          <label for="lastName" class="form-label">Last Name</label>
                          <input type="text" class="form-control" id="lastName" v-model="updatedUser.lastName">
                        </div>
                        <div class="mb-3">
                          <label for="lastName" class="form-label">Email Address</label>
                          <input type="text" class="form-control" id="lastName" v-model="updatedUser.emailAdd">
                        </div>
                        <div class="mb-3">
                          <label for="lastName" class="form-label">Username</label>
                          <input type="text" class="form-control" id="lastName" v-model="updatedUser.username">
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveChanges(user.userID)">Save Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td><button type="button" class="btn btn-danger" @click="deleteUser(user.userID)">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
<script>
export default {
name: 'Users',
data() {
    return {
    loading: false,
    updatedUser: {
        firstName: null,
        lastName: null,
        emailAdd: null,
        username: null,
    }
    };
},
computed: {
    users() {
    return this.$store.state.users;
    },
},
methods: {
    async fetchUsers() {
    this.loading = true;
    try {
        await this.$store.dispatch('fetchUsers');
    } catch (error) {
        console.error('Error fetching users:', error.message);
    } finally {
        this.loading = false;
    }
    },
    async deleteUser(userId) {
    try {
        await this.$store.dispatch('deleteUser', userId);
    } catch (error) {
        console.error('Error deleting user:', error.message);
    }
    },
    editUser(user) {
    this.updatedUser = {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAdd: user.emailAdd,
        username: user.username,
        userRole: user.userRole
    };
    },
    async saveChanges(userID) {
      try {
        await this.$store.dispatch('editUser', { userID, updatedUser: this.updatedUser });
      } catch (error) {
        console.error('Error updating user:', error.message);
      }
    }
},
created() {
    this.fetchUsers();
},
};
</script>
    
<style scoped>
table {
width: 100%;
border-collapse: collapse;
}

th, td {
border: 1px solid #dddddd;
text-align: left;
padding: 8px;
}

th {
background-color: #f2f2f2;
}
</style>
