<template>
  <div>
    <AboutView :messagePop="message" @learn-more="handleLearnMore" />
    <p>{{ receivedMessage }}</p>
    <ChildComponent @message-sent="handleMessage" />
  </div>
  <div>
    <AlertComponent title="Thông báo quan trọng"> Đây là một thông báo quan trọng! </AlertComponent>
    <AlertComponent title="Thông báo khác"> Đây là một thông báo khác! </AlertComponent>
  </div>
</template>

<script>
import AboutView from './AboutView.vue';
import AlertComponent from '../components/AlertComponent.vue';

export default {
  components: {
    AboutView,
    AlertComponent,
  },
  data() {
    return {
      message: 'Loading...',
      name: '', // Model data bound to input field
      receivedMessage: '',
    };
  },
  created() {
    this.fetchWelcomeMessage();
  },
  methods: {
    fetchWelcomeMessage() {
      setTimeout(() => {
        const welcomeMessage = 'Welcome to the Phone Management Application!';
        this.message = welcomeMessage;
        console.log('Fetched welcome message:', this.message);
      }, 1000);
    },
    handleLearnMore(data) {
      this.receivedMessage = data;
    },
    handleMessage(message) {
      this.receivedMessage = message;
    },
  },
};
</script>
