import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ProductListView from '../views/ProductListView.vue';
import TinTucView from '../views/TinTucView.vue'; // Corrected import statement
import SanPhamView from '../views/SanPhamView.vue'; // Corrected import statement

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductListView,
  },
  {
    path: '/TinTucView',
    name: 'TinTucView',
    component: TinTucView,
  },
  {
    path: '/SanPhamView',
    name: 'SanPhamView',
    component: SanPhamView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
