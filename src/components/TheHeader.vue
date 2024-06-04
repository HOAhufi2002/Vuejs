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
          <li><router-link to="/products">product</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
  <br />
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>

<style scoped>
header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Đảm bảo header hiển thị trên các phần khác */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Thêm bóng đổ nhẹ */
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
  margin-right: 1rem;
}

nav a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #ffd700; /* Màu khi hover, bạn có thể thay đổi */
}
</style>
