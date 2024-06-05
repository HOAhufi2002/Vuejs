<template>
  <div class="container">
    <h1>Chào mừng đến với SASS</h1>
    <p>Đây là một ví dụ về cách sử dụng SASS trong Vue.js.</p>
    <button class="btn">Nhấn vào đây</button>
  </div>
</template>

<script>
export default {
  name: 'StyledComponent',
};
</script>

<style lang="scss" scoped>
$primary-color: #3498db;
$padding: 20px;

.container {
  padding: $padding;
  background-color: lighten($primary-color, 40%);

  h1 {
    color: $primary-color;
    font-size: 2em;
  }

  p {
    font-size: 1.2em;
    color: darken($primary-color, 20%);
  }

  .btn {
    padding: 10px 20px;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}
</style>
