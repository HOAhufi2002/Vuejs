<template>
  <div class="card" @mouseenter="zoomIn" @mouseleave="zoomOut" :style="productStyles(product)">
    <div class="image-container">
      <div v-if="product.name.includes('iPhone 12')" class="hot-label">Hot</div>
      <img
        :src="`/images/${product.image}`"
        :alt="product.name"
        class="product-image"
        ref="productImages"
      />
    </div>
    <div class="container">
      <h4>
        <b>{{ product.name }}</b>
      </h4>
      <p class="price">{{ product.price }}</p>
      <p class="description" v-html="product.description"></p>
      <center>
        <div class="buttons">
          <button @click="$emit('buy', product)">Mua ngay</button>
          <button @click="$emit('add-to-cart', product)">Thêm vào giỏ hàng</button>
          <button class="add-product-btn" @click="$emit('edit', product)">Edit</button>
          <button class="delete-button" @click="$emit('delete', product)">Delete</button>
        </div>
      </center>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  props: ['product'],
  methods: {
    productStyles(product) {
      return {
        borderColor: product.onSale ? 'red' : 'black',
        borderWidth: '2px',
        borderStyle: 'solid',
      };
    },
    zoomIn(event) {
      gsap.to(event.currentTarget, { scale: 1.1, duration: 0.3 });
    },
    zoomOut(event) {
      gsap.to(event.currentTarget, { scale: 1, duration: 0.3 });
    },
  },
};
</script>

<style scoped>
.product-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 10px auto;
  padding-left: 20px;
  padding-right: 20px;
}

.card-column {
  width: 20%;
  margin-bottom: 20px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Add Product Button */
.add-product-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #007bff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.add-product-btn:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>

<style scoped>
.product-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 10px auto;
  padding-left: 20px;
  padding-right: 20px;
}

.card-column {
  width: 20%;
  margin-bottom: 20px;
}

.card {
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  display: block;
  margin: 0 auto;
  width: 65%;
  height: auto;
  transition: transform 0.3s, opacity 0.3s;
}

.product-image:hover {
  opacity: 1;
  transform: scale(1.1);
}

.container {
  padding: 20px;
  text-align: center;
}

h4 {
  margin-top: 10px;
  font-size: 18px;
  color: #333;
}

p {
  margin-top: 5px;
  font-size: 14px;
  color: #666;
}

.price {
  font-size: 22px;
  color: #007bff;
}

.buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  color: white;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.buttons button:nth-child(1) {
  background-color: #4caf50;
}

.buttons button:nth-child(2) {
  background-color: #008cba;
}

.buttons button:nth-child(4) {
  background-color: red;
}

.buttons button:hover {
  opacity: 0.8;
}

.search-bar {
  margin: 20px auto;
  text-align: center;
}

.search-bar input {
  padding: 10px;
  width: 50%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-bar input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

.hot-label {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  letter-spacing: 1px;
}

.notification {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
}

.notification-title {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.notification-text {
  font-size: 16px;
  margin-bottom: 15px;
  color: #555;
}

.notification-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.notification-input {
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.notification-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

.total-price {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}

.notification-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.notification-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.notification-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.notification-button:nth-child(2) {
  background-color: #dc3545;
}

.notification-button:nth-child(2):hover {
  background-color: #c82333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -30%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -20%);
  }
}

.image-container {
  position: relative;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-wrapper {
  width: 500px;
  max-width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
}

.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.success-message {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.modal-container h3 {
  margin-bottom: 20px;
}

.modal-container form {
  width: 100%;
}

.modal-container input {
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-container label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.modal-container label input {
  margin-left: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.modal-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #007bff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.modal-buttons button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-buttons button:nth-child(2) {
  background-color: #dc3545;
}

.modal-buttons button:nth-child(2):hover {
  background-color: #c82333;
}

/* Add Product Button */
.add-product-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #007bff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.add-product-btn:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Edit Product Form */
.edit-product-form {
  margin: 20px auto;
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
}

.edit-product-form h2 {
  margin-bottom: 20px;
  color: #333;
}

.edit-product-form form {
  width: 100%;
}

.edit-product-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.edit-product-form button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  color: white;
  background-color: #007bff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.edit-product-form button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.edit-product-form button:nth-child(2) {
  background-color: #dc3545;
}

.edit-product-form button:nth-child(2):hover {
  background-color: #c82333;
}
</style>
