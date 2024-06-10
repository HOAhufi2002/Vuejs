<template>
  <header>
    <div class="container">
      <router-link to="/" class="logo">
        <img height="50px" src="@/assets/logo.png" alt="Phone" />
      </router-link>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/products">Sản Phẩm</router-link></li>
          <li><router-link to="/tintuc">Tin Tức</router-link></li>
          <li><router-link to="/sanpham">Product</router-link></li>
        </ul>
      </nav>
      <div class="actions">
        <div class="search-container">
          <input v-model="searchQuery" type="text" placeholder="Search..." />
          <button @click="performSearch">Search</button>
        </div>
        <div class="cart-container">
          <router-link to="/cart" class="cart-icon">
            <img height="30px" src="@/assets/carticon.png" alt="Cart" />
            <span class="cart-count">{{ cartCount }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
  <br />
</template>

<script>
import { cartStore } from '../cartStore';

export default {
  name: 'TheHeader',
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    cartCount() {
      return cartStore.cartCount;
    },
  },
  methods: {
    performSearch() {
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>

<style scoped>
header {
  background: linear-gradient(90deg, #333, green);
  color: #fff;
  padding: 1rem 2rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 30px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  margin-right: 2rem;
}

nav a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  padding-bottom: 5px;
}

nav a:hover {
  color: #ffd700;
  border-bottom: 2px solid #ffd700;
}

.actions {
  display: flex;
  align-items: center;
}

.search-container {
  display: flex;
  align-items: center;
  margin-right: 2rem;
}

.search-container input {
  padding: 0.5rem;
  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.search-container button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #ffd700;
  color: #333;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 16px;
}

.search-container button:hover {
  background-color: #ffc107;
}
.search-container {
  display: flex;
  align-items: center;
  margin-right: 2rem;
}

.search-container input {
  padding: 0.5rem;
  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.search-container button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #ffd700;
  color: #333;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 16px;
}

.search-container button:hover {
  background-color: #ffc107;
}
.cart-container {
  display: flex;
  align-items: center;
}

.cart-icon {
  display: flex;
  align-items: center;
  position: relative;
}

.cart-icon img {
  display: block;
}

.cart-count {
  background-color: #ffd700;
  color: #333;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 14px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  nav ul {
    flex-direction: column;
    align-items: center;
  }

  nav li {
    margin: 0.5rem 0;
  }

  .search-container {
    margin: 1rem 0;
  }
}
</style>
