<template>
  <transition-group name="list" tag="div" class="product-page">
    <div v-for="(product, index) in products" :key="index" class="card-column" ref="cards">
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
              <button @click="$emit('buyNow', product)">Mua ngay</button>
              <button @click="$emit('addToCart', product)">Thêm vào giỏ hàng</button>
              <button class="add-product-btn" @click="$emit('setEditItem', product)">Edit</button>
              <button class="delete-button" @click="$emit('confirmDeleteItem', product)">
                Delete
              </button>
            </div>
          </center>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'SanPhamComponent',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
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

.image-container {
  position: relative;
}
</style>
