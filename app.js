const axios = require('axios');
const fs = require('fs');

async function fetchEndpointsData(endpointURLs) {
  try {
    return await Promise.all(endpointURLs.map(url => axios.get(url)));
  } catch (error) {
    console.error('Error fetching endpoints:', error.message);
    return [];
  }
}

function writeToFile(endpointsData) {
  const output = endpointsData.map(({ data }) => `${data.id}, ${data.title}`).join('\n');
  fs.writeFileSync('wordcloud.txt', output);
  console.log("Word Cloud saved to wordcloud.txt");
}

async function main() {
  const endpointURLs = Array.from({ length: 3 }).map((_, index) => `https://dummyjson.com/posts/${index + 1}`);
  const endpointsData = await fetchEndpointsData(endpointURLs);

  writeToFile(endpointsData);
}

main();
