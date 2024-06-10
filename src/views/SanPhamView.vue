/* eslint-disable */
<template>
  <div class="search-bar">
    <input type="text" v-model.trim="searchQuery" placeholder="Search for products..." />
  </div>

  <button class="add-product-btn" @click="showAddProductModal = true">Add New Product</button>

  <transition name="modal">
    <div class="modal-mask" v-if="showAddProductModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h3>Add New Product</h3>
          <form @submit.prevent="addItem(apiURL)">
            <input v-model="newItem.name" placeholder="Name" />
            <input v-model="newItem.description" placeholder="Description" />
            <input v-model="newItem.price" type="number" placeholder="Price" />
            <input type="file" @change="onFileChange" />
            <label style="display: flex; align-items: center">
              On Sale
              <input
                v-model="newItem.onSale"
                type="checkbox"
                style="margin-left: -220px; margin-top: 12px"
              />
            </label>
            <div class="modal-buttons">
              <button type="submit">Add Product</button>
              <button type="button" @click="showAddProductModal = false">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>

  <transition name="modal">
    <div class="modal-mask" v-if="showEditProductModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h3>Edit Product</h3>
          <form @submit.prevent="updateItem(apiURL)">
            <input v-model="editItem.name" placeholder="Name" />
            <input v-model="editItem.description" placeholder="Description" />
            <input v-model="editItem.price" type="number" placeholder="Price" />
            <input v-model="editItem.image" placeholder="Image URL" />
            <label class="checkbox-label">
              On Sale
              <input
                style="margin-left: -220px; margin-top: 12px"
                v-model="editItem.onSale"
                type="checkbox"
              />
            </label>
            <div class="modal-buttons">
              <button type="submit">Update Product</button>
              <button type="button" @click="showEditProductModal = false">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>

  <transition-group name="list" tag="div" class="product-page">
    <div v-for="(product, index) in filteredProducts" :key="index" class="card-column" ref="cards">
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
              <button @click="buyNow(product)">Mua ngay</button>
              <button @click="addToCart(product)">Thêm vào giỏ hàng</button>
              <button class="add-product-btn" @click="setEditItem(product)">Edit</button>
              <button class="delete-button" @click="confirmDeleteItem(product)">Delete</button>
            </div>
          </center>
        </div>
      </div>
    </div>

    <div v-if="showNotification" class="notification">
      <h2 class="notification-title">Purchase Confirmation</h2>
      <p class="notification-text">
        You have selected: <strong>{{ purchasedProductName }}</strong>
      </p>
      <div class="notification-inputs">
        <input
          type="text"
          v-model.trim="customerName"
          placeholder="Enter your name"
          @keydown.enter.prevent="confirmPurchase"
          class="notification-input"
        />
        <input
          type="text"
          v-model.number="customerPhone"
          placeholder="Enter your phone number"
          @keydown.enter.prevent="confirmPurchase"
          class="notification-input"
        />
      </div>
      <div v-if="cart.length" class="total-price">
        <h2>Total Price: {{ totalPrice }}</h2>
      </div>
      <div class="notification-buttons">
        <button @click="confirmPurchase" class="notification-button">Confirm</button>
        <button @click="closeNotification" class="notification-button">Close</button>
      </div>
    </div>
  </transition-group>

  <transition name="modal">
    <div class="modal-mask" v-if="showDeleteConfirmation">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete this product?</p>
          <div class="modal-buttons">
            <button @click="deleteConfirmedItem">Yes</button>
            <button @click="showDeleteConfirmation = false">No</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import { gsap } from 'gsap';
import { fetchDataMixin } from '@/mixins/fetchDataMixin';

export default {
  name: 'ProductPage',
  mixins: [fetchDataMixin],
  data() {
    return {
      message: 'List of iPhones',
      searchQuery: '',
      cart: [],
      showNotification: false,
      purchasedProductName: '',
      customerName: '',
      customerPhone: '',
      apiURL: 'https://localhost:44336/api/sanpham',
      newItem: {
        name: '',
        description: '',
        price: 0,
        image: '',
        onSale: false,
      },
      showAddProductModal: false,
      showEditProductModal: false,
      showDeleteConfirmation: false,
      productToDelete: null,
      editItem: null,
    };
  },
  computed: {
    filteredProducts() {
      return this.items.filter((product) => {
        return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    totalPrice() {
      return this.cart.reduce((total, product) => total + product.price, 0);
    },
  },
  watch: {
    searchQuery(newQuery, oldQuery) {
      console.log(`Search query changed from "${oldQuery}" to "${newQuery}"`);
    },
  },
  methods: {
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newItem.image = file.name; // Ensure to save the file name to newItem.image
      }
    },
    buyNow(product) {
      console.log(`Buying ${product.name}`);
      this.purchasedProductName = product.name;
      this.showNotification = true;
      this.cart.push(product);
    },
    addToCart(product) {
      console.log(`Adding ${product.name} to cart`);
      this.cart.push(product);
    },
    closeNotification() {
      this.showNotification = false;
      this.customerName = '';
      this.customerPhone = '';
    },
    confirmPurchase() {
      if (this.customerName && this.customerPhone) {
        alert(
          `Thank you, ${this.customerName}! You have purchased ${this.purchasedProductName}. We will contact you at ${this.customerPhone} soon.`,
        );
        this.closeNotification();
      } else {
        alert('Please enter your name and phone number.');
      }
    },
    productStyles(product) {
      return {
        borderColor: product.onSale ? 'red' : 'black',
        borderWidth: '2px',
        borderStyle: 'solid',
      };
    },
    zoomIn(event) {
      if (!this.showNotification) {
        gsap.to(event.currentTarget, { scale: 1.1, duration: 0.3 });
      }
    },
    zoomOut(event) {
      if (!this.showNotification) {
        gsap.to(event.currentTarget, { scale: 1, duration: 0.3 });
      }
    },
    animateProducts() {
      this.$nextTick(() => {
        const cards = this.$refs.cards;
        if (cards) {
          gsap.fromTo(
            cards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.2,
              ease: 'power2.out',
            },
          );
        }
      });
    },
    animateImages() {
      this.$nextTick(() => {
        const productImages = this.$refs.productImages;
        if (productImages) {
          gsap.fromTo(
            productImages,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.3,
              ease: 'power2.out',
            },
          );
        }
      });
    },
    async addItem(url) {
      this.loading = true;
      try {
        await axios.post(`${url}/add`, this.newItem);
        await this.fetchData(url);
        this.newItem = {
          name: '',
          description: '',
          price: 0,
          image: '',
          onSale: false,
        };
        this.showAddProductModal = false;

        this.successMessage = 'Product added successfully!';
        this.showSuccessMessage = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        });
        alert('Product updated successfully!');
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    setEditItem(product) {
      this.editItem = { ...product };
      this.showEditProductModal = true;
    },
    async updateItem(url) {
      try {
        console.log('Updating item:', this.editItem); // Kiểm tra dữ liệu đang được gửi
        const response = await axios.put(`${url}/update${this.editItem.id}`, this.editItem);
        console.log('Server response:', response.data); // Xem phản hồi từ server
        await this.fetchData(url);
        this.editItem = null;
        this.showEditProductModal = false;
        alert('Product updated successfully!');
      } catch (err) {
        console.error('Update failed:', err); // Log lỗi nếu có
      }
    },
    confirmDeleteItem(product) {
      this.productToDelete = product;
      this.showDeleteConfirmation = true;
    },
    deleteConfirmedItem() {
      this.showDeleteConfirmation = false;
      this.deleteItem(this.apiURL, this.productToDelete.id);
      this.productToDelete = null;
    },
  },
  mounted() {
    this.animateProducts();
    this.animateImages();
  },
  updated() {
    this.animateProducts();
    this.animateImages();
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
