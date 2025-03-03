const { isMainThread } = require('worker_threads');
const endpoints = require('./modules/endpoints');
const files = require('./modules/files');
const words = require('./modules/words');

async function main() {
  const baseUrl = 'https://dummyjson.com/posts/';
  const endpointsData = await endpoints.fetchData(baseUrl, 100);
  const wordsFrequencies = await words.getWordsAndFrequencies(endpointsData);

  files.writeDataToFile(wordsFrequencies, 'wordcloud.txt');
}

if (isMainThread) {
  main().catch(console.error);
}
