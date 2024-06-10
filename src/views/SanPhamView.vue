<template>
  <div class="search-bar">
    <input type="text" v-model.trim="searchQuery" placeholder="Search for products..." />
  </div>

  <button class="add-product-btn" @click="showAddProductModal = true">Add New Product</button>

  <AddProduct
    :show="showAddProductModal"
    :apiURL="apiURL"
    @close="showAddProductModal = false"
    @refresh="fetchData(apiURL)"
  />

  <EditProduct
    :show="showEditProductModal"
    :apiURL="apiURL"
    :product="editItem"
    @close="showEditProductModal = false"
    @refresh="fetchData(apiURL)"
  />

  <DeleteProduct
    :show="showDeleteConfirmation"
    :apiURL="apiURL"
    :product="productToDelete"
    @close="showDeleteConfirmation = false"
    @refresh="fetchData(apiURL)"
  />

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
</template>

<script>
import { gsap } from 'gsap';
import { fetchDataMixin } from '@/mixins/fetchDataMixin';
import AddProduct from '@/components/SanPhamComponent/AddProduct.vue';
import EditProduct from '@/components/SanPhamComponent/EditProduct.vue';
import DeleteProduct from '@/components/SanPhamComponent/DeleteProduct.vue';
const baseURL = 'https://localhost:44336/api/';
export default {
  name: 'SanPhamView',
  mixins: [fetchDataMixin],
  components: {
    AddProduct,
    EditProduct,
    DeleteProduct,
  },
  data() {
    return {
      searchQuery: '',
      cart: [],
      showNotification: false,
      purchasedProductName: '',
      customerName: '',
      customerPhone: '',
      apiURL: baseURL + 'sanpham',
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
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
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
            { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power2.out' },
          );
        }
      });
    },
    setEditItem(product) {
      this.editItem = { ...product };
      this.showEditProductModal = true;
    },
    confirmDeleteItem(product) {
      this.productToDelete = product;
      this.showDeleteConfirmation = true;
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
} /* Edit Product Form */
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
