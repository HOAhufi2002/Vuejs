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
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async deleteItem(url, id) {
      this.loading = true;
      try {
        await axios.delete(`${url}/${id}`);
        await this.fetchData(url);
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async updateItem(url) {
      this.loading = true;
      try {
        console.log('Updating item:', this.editItem); // Debugging line
        const response = await axios.put(`${url}/update/${this.editItem.id}`, this.editItem);
        console.log('Server response:', response); // Debugging line
        await this.fetchData(url);
        this.editItem = null;
        this.showEditProductModal = false;
        this.successMessage = 'Product updated successfully!';
        this.showSuccessMessage = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        });
      } catch (err) {
        this.error = err;
        console.error('Update failed:', err); // Debugging line
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchData(this.apiURL);
  },
};
