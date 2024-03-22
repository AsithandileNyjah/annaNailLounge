import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueCookies from 'vue-cookies'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './router'
import store from './store'
import jwtDecode from 'jwt-decode'

router.beforeEach((to, from, next) => {
    const isAuthenticated = checkAuthenticationStatus(); 
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login'); 
    } else {
      next();
    }
  });
  
  function checkAuthenticationStatus() {
    const cookieExists = document.cookie.includes('jwt');
    return cookieExists;
  }
  
createApp(App).use(store).use(router).use(VueCookies).mount('#app')
 