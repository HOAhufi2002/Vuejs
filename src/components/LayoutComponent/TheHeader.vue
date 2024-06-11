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
          <li><router-link to="/sanpham">Sản Phẩm API</router-link></li>
          <li>
            <div class="search-bar">
              <input
                type="text"
                :value="searchQuery"
                @input="updateSearchQuery"
                placeholder="Search for products..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="search-icon"
              >
                <path
                  d="M10 2a8 8 0 0 1 6.32 12.9l4.12 4.12a1 1 0 0 1-1.41 1.41l-4.12-4.12A8 8 0 1 1 10 2m0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"
                />
              </svg>
            </div>
          </li>
        </ul>
      </nav>
      <div class="actions">
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
import { cartStore } from '@/router/cartStore';

export default {
  name: 'TheHeader',
  props: {
    searchQuery: {
      type: String,
      default: '',
    },
  },
  computed: {
    cartCount() {
      return cartStore.cartCount;
    },
  },
  methods: {
    updateSearchQuery(event) {
      this.$emit('update-search-query', event.target.value);
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

.search-bar {
  position: relative;
  width: 250px;
}

.search-bar input {
  width: 100%;
  padding: 10px 10px 10px 10px; /* Adjust padding to make room for the icon */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.search-bar .search-icon {
  position: absolute;
  top: 50%;
  right: 10px; /* Position the icon inside the input field */
  transform: translateY(-50%);
  fill: #888;
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
