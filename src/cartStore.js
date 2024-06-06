import { reactive } from 'vue';

export const cartStore = reactive({
  items: [],
  get cartCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },
  addToCart(product) {
    const item = this.items.find((item) => item.name === product.name);
    if (item) {
      item.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    // Log the current items in the cart
    console.log('Current items in the cart:', this.items);
  },
  removeFromCart(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  },
});
