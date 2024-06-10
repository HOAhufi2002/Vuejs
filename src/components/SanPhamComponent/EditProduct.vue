<template>
  <transition name="modal">
    <div class="modal-mask" v-if="show">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h3>Edit Product</h3>
          <form @submit.prevent="updateItem(apiURL)">
            <input v-model="editItem.name" placeholder="Name" />
            <input v-model="editItem.description" placeholder="Description" />
            <input v-model="editItem.price" type="number" placeholder="Price" />
            <input v-model="editItem.image" placeholder="Image URL" />
            <label style="display: flex; align-items: center">
              On Sale
              <input
                v-model="editItem.onSale"
                type="checkbox"
                style="margin-left: 10px; margin-top: 12px"
              />
            </label>
            <div class="modal-buttons">
              <button type="submit">Update Product</button>
              <button type="button" @click="$emit('close')">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EditProduct',
  props: ['show', 'apiURL', 'product'],
  data() {
    return {
      editItem: { ...this.product },
    };
  },
  methods: {
    async updateItem(url) {
      try {
        console.log('Updating item:', this.editItem); // Kiểm tra dữ liệu đang được gửi
        const response = await axios.put(`${url}/update${this.editItem.id}`, this.editItem);
        console.log('Server response:', response.data); // Xem phản hồi từ server
        this.editItem = null;
        this.showEditProductModal = false;
        alert('Product updated successfully!');
      } catch (err) {
        console.error('Update failed:', err); // Log lỗi nếu có
      }
    },
  },
  watch: {
    product(newVal) {
      this.editItem = { ...newVal };
    },
  },
};
</script>

<style scoped>
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