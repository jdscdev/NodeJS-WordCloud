
module.exports = {
  // Source: https://productresources.collibra.com/docs/collibra/latest/Content/Settings/ServicesConfiguration/co_stop-words.htm
  STOP_WORDS: [
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such',
    'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'
  ],
  getWordsAndFrequencies: function(endpointsData) {
    const validEndpointsData = (endpointsData && endpointsData.length > 0 &&
                                endpointsData[0].hasOwnProperty('data') && endpointsData[0].data &&
                                endpointsData[0].data.hasOwnProperty('body') && endpointsData[0].data.body &&
                                typeof endpointsData[0].data.body === 'string');

    if (!validEndpointsData) {
      throw new Error('No endpoints data or incorrect properties');
    }

    const uniqueWords = [];
    const resultArray = [];

    endpointsData.forEach(eData => {
      eData.data.body.split(' ').map(word => {
        const wordAux = word.replace(/[^a-zA-Z'\-]/g, '').toLowerCase().trim();
        
        if (wordAux && !this.STOP_WORDS.includes(wordAux)) {
          if (!uniqueWords.includes(wordAux)) {
            resultArray.push({ 
              word: wordAux,
              frequency: 1,
              fontsize: 'Small'
            });
            uniqueWords.push(wordAux);
          } else {
            resultArray.find(o => o.word === wordAux).frequency++;
          }
        }
      });
    });

    if (resultArray.length === 0) {
      throw new Error('No valid words found in endpoints data');
    }

    // removes words with just 1 frequency and sort by frequency in descending order
    const sortedResArray = resultArray
      .filter(o => o.frequency > 1)
      .sort((a, b) => b.frequency - a.frequency);
    
    this.setFontsize(sortedResArray);

    return sortedResArray;
  },
  setFontsize: function(wordsFrequencies) {
    const validWordsFrequencies = (wordsFrequencies && wordsFrequencies.length > 0 &&
                                   wordsFrequencies[0].hasOwnProperty('frequency') && wordsFrequencies[0].frequency &&
                                   typeof wordsFrequencies[0].frequency === 'number' && wordsFrequencies[0].frequency > 0);
    if (!validWordsFrequencies) {
      throw new Error('Missing endpoints data or no max frequency');
    }

    const maxFrequency = wordsFrequencies[0].frequency;

    wordsFrequencies.forEach(wordObj => {
      wordObj.fontsize = (
        wordObj.frequency === maxFrequency ? 'Huge' : // if 
        wordObj.frequency > maxFrequency * 0.6 ? 'Big' : // else if 
        wordObj.frequency > maxFrequency * 0.3 ? 'Normal' : // else if 
        'Small' // else 
      );
    });
  }
};
