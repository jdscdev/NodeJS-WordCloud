const axios = require('axios');

module.exports = {
  fetchData: async function(baseUrl, count) {
    const endpointURLs = this.getURLs(baseUrl, count);
    try {
      return await Promise.all(endpointURLs.map(url => axios.get(url)));
    } catch (error) {
      console.error('Error fetching endpoints:', error.message);
      return [];
    }
  },
  getURLs: function(baseUrl, count) {
    return Array.from({ length: count }).map((_, index) => baseUrl + (index + 1));
  }
};
