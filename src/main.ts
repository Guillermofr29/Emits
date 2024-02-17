import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/components/Login/Login.vue') },
    { path: '/register', component: () => import('@/components/Register/Register.vue') },
    { path: '/crud', component: () => import('@/components/CRUD/UserTable.vue') },
  ],
});

app.use(createPinia());
app.use(router);

app.mount('#app');
