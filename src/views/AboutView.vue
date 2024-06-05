<template>
  <div class="about-container">
    <!-- Sử dụng prop nhận được từ component cha -->
    <h1>{{ messagePop }}</h1>
    <p>{{ description }}</p>
    <button class="btn" @click="learnMore">Learn More</button>
    <button style="margin-left: 10px" class="btn" @click="sendMessage">Send Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'About Us',
    };
  },
  methods: {
    learnMore() {
      // Gọi callback function và truyền dữ liệu
      this.$emit('learn-more', 'Đây là một mẫu nội dung giới thiệu về điện thoại...');
    },
    sendMessage() {
      // Phát sự kiện 'message-sent' và truyền dữ liệu đi cùng
      this.$emit('message-sent', 'Hello from child component!');
    },
  },
  // Nhận prop từ component cha
  props: ['messagePop'],
};
</script>

<style lang="scss" scoped>
// CSS styles here
</style>

<style lang="scss" scoped>
$primary-color: #3498db;
$padding: 20px;

.about-container {
  padding: $padding;
  background-color: lighten($primary-color, 40%);

  h1 {
    color: $primary-color;
    font-size: 2em;
  }

  p {
    font-size: 1.2em;
    color: darken($primary-color, 20%);
  }

  .btn {
    padding: 10px 20px;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}
</style>
