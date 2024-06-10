<template>
  <div v-if="loading" class="loading-indicator">Loading...</div>
  <div v-else>
    <slot :data="data" :error="error"></slot>
  </div>
</template>

<script>
export default {
  name: 'FetchData',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      data: null,
      loading: true,
      error: null,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.error = null;
      fetch(this.apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.loading-indicator {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #007bff;
}
</style>
