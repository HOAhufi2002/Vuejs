import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ProductListView from '../views/ProductListView.vue';
import TinTucView from '../views/TinTucView.vue';
import SanPhamView from '../views/SanPhamView.vue';
import CartView from '../views/CartView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductListView,
  },
  {
    path: '/tintuc',
    name: 'TinTuc',
    component: TinTucView,
  },
  {
    path: '/sanpham',
    name: 'SanPham',
    component: SanPhamView,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
