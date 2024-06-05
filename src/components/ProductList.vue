<template>
  <center>
    <h1>{{ message }}</h1>
  </center>

  <div class="search-bar">
    <!-- Input field for search keyword with v-model modifier -->
    <input type="text" v-model.trim="searchQuery" placeholder="Search for products..." />
  </div>

  <transition-group name="list" tag="div" class="product-page">
    <div v-for="(product, index) in filteredProducts" :key="index" class="card-column">
      <div
        ref="cards"
        class="card"
        @mouseenter="zoomIn"
        @mouseleave="zoomOut"
        :style="productStyles(product)"
      >
        <div class="image-container">
          <!-- Add hot label for iPhone 12 -->
          <div v-if="product.name.includes('iPhone 12')" class="hot-label">Hot</div>
          <img :src="product.image" :alt="product.name" class="product-image" />
        </div>
        <div class="container">
          <h4>
            <b>{{ product.name }}</b>
          </h4>
          <p class="price">{{ product.price }}</p>
          <p class="description" v-html="product.description"></p>
          <center>
            <div class="buttons">
              <!-- Listening to the click event for buyNow method -->
              <button @click="buyNow(product)">Mua ngay</button>
              <!-- Listening to the click event for addToCart method -->
              <button @click="addToCart(product)">Thêm vào giỏ hàng</button>
            </div>
          </center>
        </div>
      </div>
    </div>
    <!-- Modal for buy now notification -->
    <div v-if="showNotification" class="notification">
      <p>Bạn đã chọn mua: {{ purchasedProductName }}</p>
      <!-- Listening to keypress event with modifiers for name and phone inputs -->
      <input
        type="text"
        v-model.trim="customerName"
        placeholder="Enter your name"
        @keydown.enter.prevent="confirmPurchase"
      />
      <input
        type="text"
        v-model.number="customerPhone"
        placeholder="Enter your phone number"
        @keydown.enter.prevent="confirmPurchase"
      />
      <div v-if="cart.length" class="total-price">
        <h2>Total Price: {{ totalPrice }}</h2>
      </div>
      <!-- Listening to the click event for closeNotification method -->
      <button @click="closeNotification">Close</button>
    </div>
  </transition-group>
</template>

<script>
import { gsap } from 'gsap';
import iphone12mini from '@/assets/iphone12mini.jpg';
import iphone12 from '@/assets/iphone12.jpg';
import iphone13mini from '@/assets/iphone12mini.jpg';
import iphone14pro from '@/assets/iphone14promax.jpg';

export default {
  name: 'ProductPage',
  data() {
    return {
      message: 'List of iPhones',
      searchQuery: '',
      cart: [],
      products: [
        {
          name: 'iPhone 12 Mini',
          price: 699,
          description:
            'Compact and powerful, featuring <strong>A14 Bionic chip</strong> and dual-camera system.',
          image: iphone12mini,
          onSale: true,
        },
        {
          name: 'iPhone 12',
          price: 799,
          description:
            'Powerful performance with <strong>A14 Bionic chip</strong> and Super Retina XDR display.',
          image: iphone12,
          onSale: false,
        },
        {
          name: 'iPhone 13 Mini',
          price: 699,
          description:
            'Compact and powerful, featuring <strong>A15 Bionic chip</strong> and dual-camera system.',
          image: iphone13mini,
          onSale: false,
        },
        {
          name: 'iPhone 14 Pro',
          price: 999,
          description: 'Pro camera system with <strong>LiDAR scanner</strong> and A16 Bionic chip.',
          image: iphone14pro,
          onSale: false,
        },
      ],
      showNotification: false,
      purchasedProductName: '',
      customerName: '',
      customerPhone: '',
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
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
      // Perform any additional actions when searchQuery changes
    },
  },
  methods: {
    // Method to handle the buy now action
    buyNow(product) {
      console.log(`Buying ${product.name}`);
      // Show the notification with product name
      this.purchasedProductName = product.name;
      this.showNotification = true;
      this.cart.push(product);
    },
    // Method to handle adding product to cart
    addToCart(product) {
      console.log(`Adding ${product.name} to cart`);
      // Implement the add to cart functionality
      this.cart.push(product);
    },
    // Method to close the notification
    closeNotification() {
      this.showNotification = false;
      this.customerName = '';
      this.customerPhone = '';
    },
    // Method to confirm the purchase
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
    // Method to determine styles dynamically based on product properties
    productStyles(product) {
      return {
        borderColor: product.onSale ? 'red' : 'black',
        borderWidth: '2px',
        borderStyle: 'solid',
      };
    },
    // Method to zoom in the product card
    zoomIn(event) {
      if (!this.showNotification) {
        gsap.to(event.currentTarget, { scale: 1.1, duration: 0.3 });
      }
    },
    // Method to zoom out the product card
    zoomOut(event) {
      if (!this.showNotification) {
        gsap.to(event.currentTarget, { scale: 1, duration: 0.3 });
      }
    },
    // Method to animate products on load
    animateProducts() {
      if (!this.showNotification) {
        this.$nextTick(() => {
          gsap.fromTo(
            this.$refs.cards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.2,
              ease: 'power2.out',
            },
          );
        });
      }
    },
  },
  mounted() {
    this.animateProducts();
  },
  updated() {
    this.animateProducts();
  },
};
</script>

<style scoped>
.product-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px auto;
}

.card-column {
  width: 22%;
  margin-bottom: 20px;
}

.card {
  position: relative; /* Ensure positioning context for .hot-label */
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
  width: 70%;
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
  font-size: 20px;
  color: #333;
}

p {
  margin-top: 5px;
  font-size: 16px;
  color: #666;
}

.price {
  font-size: 24px;
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
.list-enter, .list-leave-to /* .list-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.buttons button:nth-child(1) {
  background-color: #4caf50;
}

.buttons button:nth-child(2) {
  background-color: #008cba;
}

.buttons button:hover {
  opacity: 0.8;
}

/* Styles for search bar */
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

/* Styles for hot label */
.hot-label {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold; /* Making the text bold */
  text-transform: uppercase; /* Converting text to uppercase */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adding a slight shadow for depth */
  z-index: 10; /* Ensuring it stays above other elements */
  letter-spacing: 1px; /* Adding space between letters */
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
}

.image-container {
  position: relative;
}
</style>
