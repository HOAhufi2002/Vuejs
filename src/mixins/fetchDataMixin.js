import axios from 'axios';

export const fetchDataMixin = {
  data() {
    return {
      items: [],
      loading: false,
      error: null,
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
  },
  created() {
    this.fetchData(this.apiURL);
  },
};
