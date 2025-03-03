const axios = require('axios');

module.exports = {
  fetchData: async function(baseUrl, count) {
    const endpointURLs = this.getURLs(baseUrl, count);

    return await Promise.all(endpointURLs.map(url => axios.get(url)));
  },
  getURLs: function(baseUrl, count) {
    if (!baseUrl || !count || count < 1) {
      throw new Error('Missing baseUrl or count');
    }
    return Array.from({ length: count }).map((_, index) => baseUrl + (index + 1));
  }
};
