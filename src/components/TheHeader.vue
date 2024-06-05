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
          <li><router-link to="/TinTucView">Tin Tức</router-link></li>
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
  background: linear-gradient(90deg, #333, #555);
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
}
</style>
