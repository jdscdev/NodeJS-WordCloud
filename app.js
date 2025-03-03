const endpoints = require('./modules/endpoints');
const files = require('./modules/files');

async function main() {
  const baseUrl = 'https://dummyjson.com/posts/';
  const endpointsData = await endpoints.fetchData(baseUrl, 3);

  files.write(endpointsData, 'wordcloud.txt');
}

main();
