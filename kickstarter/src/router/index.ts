import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ActusView from '../views/ActusView.vue'; // Import the new Actus view

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/actus', name: 'actus', component: ActusView }, // Add the new route
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;