# WordCloud Generator in Node.js

## Overview
This Node.js program fetches text data from multiple URLs, processes word frequencies, and generates a word cloud classification while handling concurrency efficiently using asynchronous requests.

## Features
- Fetches text data from **100 URLs** using an API.
- Implements **concurrent requests** to optimize performance.
- Analyzes word frequency, excluding common stopwords.
- Classifies words into categories (`Huge`, `Big`, `Normal`, `Small`) based on frequency.
- Words with `frequency = 1` will be excluded from listing.
- Saves results in a `wordcloud.txt` file.

## Requirements
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/jdscdev/NodeJS-WordCloud.git
   cd NodeJS-WordCloud
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Run the script:
   ```sh
   node app.js
   ```
2. After execution, check the `wordcloud.txt` file for results.

## File Output Format
Each line in `wordcloud.txt` follows this structure:
```
word, frequency, fontsize
```
Example:
```
data, 50, Huge
analysis, 40, Big
process, 20, Normal
fetch, 10, Small
```

## Customization
- Modify `baseUrl` in `app.js` to fetch data from different sources.
- Adjust `numberOfEndpoints` in `app.js` to increase or decrease the number of endpoints, therefore the number of words.
- Update the stopword list `STOP_WORDS` in `./modules/words.js` to refine word filtering.

## Tests
1. Run the script:
   ```sh
   jest
   ```
