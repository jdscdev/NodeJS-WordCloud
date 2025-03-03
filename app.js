const endpoints = require('./modules/endpoints');
const files = require('./modules/files');
const words = require('./modules/words');

async function main() {
  const baseUrl = 'https://dummyjson.com/posts/';
  const endpointsData = await endpoints.fetchData(baseUrl, 3);
  const wordsFrequencies = await words.getFrequencies(endpointsData);

  files.write(wordsFrequencies, 'wordcloud.txt');
}

main();
