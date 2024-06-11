<template>
  <transition name="modal">
    <div class="modal-mask" v-if="show">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h3>Add New Product</h3>
          <form @submit.prevent="addItem">
            <input v-model="newItem.name" placeholder="Name" required />
            <input v-model="newItem.description" placeholder="Description" required />
            <input v-model="newItem.price" type="number" placeholder="Price" required />
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
              <button type="button" @click="$emit('close')">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { fetchDataMixin } from '../../mixins/fetchDataMixin';

export default {
  name: 'AddProduct',
  props: ['show', 'apiURL'],
  mixins: [fetchDataMixin],

  data() {
    return {
      newItem: {
        name: '',
        description: '',
        price: 0,
        image: '',
        onSale: false,
      },
      file: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },

    resetForm() {
      this.newItem = {
        name: '',
        description: '',
        price: 0,
        image: '',
        onSale: false,
      };
      this.file = null;
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
</style>
