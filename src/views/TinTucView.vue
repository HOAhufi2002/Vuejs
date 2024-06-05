<template>
  <div class="news-container">
    <h1>Quản lý Tin Tức</h1>
    <!-- Form to Add/Edit News -->
    <form @submit.prevent="submitNews" class="news-form">
      <div class="form-group">
        <label for="title">Tiêu đề</label>
        <input id="title" v-model="form.title" placeholder="Tiêu đề" required />
      </div>
      <div class="form-group">
        <label for="content">Nội dung</label>
        <textarea id="content" v-model="form.content" placeholder="Nội dung" required></textarea>
      </div>
      <div class="form-buttons">
        <button type="submit" class="btn">{{ editMode ? 'Cập nhật' : 'Thêm' }} Tin Tức</button>
        <button type="button" class="btn btn-cancel" @click="resetForm">Hủy</button>
      </div>
    </form>
    <!-- List of News -->
    <ul class="news-list">
      <li v-for="(news, index) in newsList" :key="news.id" class="news-item">
        <div class="news-header">
          <h3>{{ news.title }}</h3>
          <div class="news-actions">
            <button @click="editNews(index)" class="btn btn-edit">Sửa</button>
            <button @click="deleteNews(index)" class="btn btn-delete">Xóa</button>
          </div>
        </div>
        <p>{{ news.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [],
      form: {
        id: null,
        title: '',
        content: '',
      },
      editMode: false,
    };
  },
  created() {
    // Lifecycle hook: Component created, Virtual DOM is created but not mounted yet
    console.log('Component created!');
    this.fetchNews();
  },
  mounted() {
    // Lifecycle hook: Component is now mounted, Virtual DOM is applied to the real DOM
    console.log('Component mounted!');
  },
  updated() {
    // Lifecycle hook: Called when Virtual DOM has been updated and applied to the real DOM
    console.log('Component updated!');
  },

  methods: {
    fetchNews() {
      // Simulate fetching news data from an API
      this.newsList = [
        { id: 1, title: 'Tin Tức 1', content: 'Nội dung tin tức 1' },
        { id: 2, title: 'Tin Tức 2', content: 'Nội dung tin tức 2' },
      ];
    },
    submitNews() {
      if (this.editMode) {
        // Update existing news
        const index = this.newsList.findIndex((n) => n.id === this.form.id);
        if (index !== -1) {
          // Update the Virtual DOM with the new data
          this.newsList.splice(index, 1, { ...this.form });
          // Virtual DOM will be compared with the previous state, and real DOM will be patched
        }
      } else {
        // Add new news
        this.newsList.push({
          id: Date.now(),
          title: this.form.title,
          content: this.form.content,
        });
        // Virtual DOM will be updated with the new news item and the real DOM will be patched
      }
      this.resetForm();
    },
    editNews(index) {
      // Load news item into form for editing
      this.form = { ...this.newsList[index] };
      this.editMode = true;
    },
    deleteNews(index) {
      // Remove news item from the list
      this.newsList.splice(index, 1);
      // Virtual DOM will be updated to remove the item and the real DOM will be patched
      this.resetForm();
    },
    resetForm() {
      // Reset the form and exit edit mode
      this.form = {
        id: null,
        title: '',
        content: '',
      };
      this.editMode = false;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.news-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.news-form {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-edit {
  background-color: #ffc107;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.news-list {
  list-style-type: none;
  padding: 0;
}

.news-item {
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-actions button {
  margin-left: 10px;
}

h3 {
  margin: 0;
}

p {
  margin: 10px 0 0;
}
</style>
