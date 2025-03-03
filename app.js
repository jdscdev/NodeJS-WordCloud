const { isMainThread } = require('worker_threads');
const endpoints = require('./modules/endpoints');
const files = require('./modules/files');
const words = require('./modules/words');

async function main() {
  const baseUrl = 'https://dummyjson.com/posts/';
  const numberOfEndpoints = 100;
  const endpointsData = await endpoints.fetchData(baseUrl, numberOfEndpoints);
  const wordsFrequencies = await words.getWordsAndFrequencies(endpointsData);

  files.writeDataToFile(wordsFrequencies, 'wordcloud.txt');
}

if (isMainThread) {
  main().catch(console.error);
}
