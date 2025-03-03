const axios = require('axios');

module.exports = {
  fetchData: async function(baseUrl, count) {
    const endpointURLs = this.getURLs(baseUrl, count);
    try {
      return await Promise.all(endpointURLs.map(url => axios.get(url)));
    } catch (error) {
      throw new Error(`Error fetching endpoints: ${error.message}`);
    }
  },
  getURLs: function(baseUrl, count) {
    if (!baseUrl || !count) {
      throw new Error('Missing baseUrl or count');
    }
    return Array.from({ length: count }).map((_, index) => baseUrl + (index + 1));
  }
};
