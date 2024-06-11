import axios from 'axios';

export const fetchDataMixin = {
  data() {
    return {
      items: [],
      loading: false,
      error: null,
      newItem: {
        name: '',
        description: '',
        price: 0,
        image: '',
        onSale: false,
      },
      editItem: null,
      showAddProductModal: false,
      showEditProductModal: false,
      showSuccessMessage: false,
      successMessage: '',
    };
  },
  methods: {
    async fetchData(url) {
      this.loading = true;
      try {
        const response = await axios.get(url);
        this.items = response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async deleteConfirmedItem() {
      if (!this.product || !this.product.id) {
        return;
      }
      try {
        await axios.delete(`${this.apiURL}/${this.product.id}`);
        this.$emit('refresh');
        this.$emit('close');
        alert('Product deleted successfully!');
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Error deleting product.');
      }
    },
    async uploadFile() {
      if (!this.file) return null;
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        const response = await axios.post(`${this.apiURL}/upload`, formData);
        return response.data.fileName;
      } catch (error) {
        console.error('File upload failed:', error);
        throw error;
      }
    },
    async addItem() {
      try {
        if (this.file) {
          this.newItem.image = await this.uploadFile();
        }
        await axios.post(`${this.apiURL}/add`, this.newItem);
        this.resetForm();
        this.$emit('refresh');
        this.$emit('close');
        alert('Product added successfully!');
      } catch (err) {
        console.error('Error adding product:', err);
        alert('Failed to add product!');
      }
    },
  },

  created() {
    this.fetchData(this.apiURL);
  },
};
