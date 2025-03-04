const wordsModule = require('../modules/words');

describe('wordsModule', () => {
  describe('getWordsAndFrequencies', () => {
    it('should write data to a file correctly', () => {
      const stopWords = wordsModule.STOP_WORDS.join(' ');
      const endpointsData = [
        { data: { body: 'One two three four five six seven' } }, // One has one frequency so is not listed in wordcloud
        { data: { body: 'Two three four five six seven' } },
        { data: { body: 'Three four five six seven' } },
        { data: { body: 'Four five six seven' } },
        { data: { body: 'Five six seven' } },
        { data: { body: 'Six seven' } },
        { data: { body: 'Seven' } },
        { data: { body: `${stopWords} ${stopWords}` } } // Stop words are not listed in wordcloud
      ];
      const resultArray = wordsModule.getWordsAndFrequencies(endpointsData);
      expect(resultArray[0]).toEqual({ word: 'seven', frequency: 7, fontsize: 'Huge' });
      expect(resultArray[1]).toEqual({ word: 'six',   frequency: 6, fontsize: 'Big' });
      expect(resultArray[2]).toEqual({ word: 'five',  frequency: 5, fontsize: 'Big' });
      expect(resultArray[3]).toEqual({ word: 'four',  frequency: 4, fontsize: 'Normal' });
      expect(resultArray[4]).toEqual({ word: 'three', frequency: 3, fontsize: 'Normal' });
      expect(resultArray[5]).toEqual({ word: 'two',   frequency: 2, fontsize: 'Small' });
      expect(resultArray.length).toEqual(6);
    });

    it('should throw error if endpointsData is empty or null', () => {
      const errorMsg = 'No endpoints data or incorrect properties';
      expect(() => wordsModule.getWordsAndFrequencies([])).toThrow(errorMsg);
      expect(() => wordsModule.getWordsAndFrequencies(null)).toThrow(errorMsg);
    });

    it('should throw error if endpointsData has incorrect properties', () => {
      const errorMsg = 'No endpoints data or incorrect properties';
      expect(() => wordsModule.getWordsAndFrequencies([{}])).toThrow(errorMsg);
      expect(() => wordsModule.getWordsAndFrequencies([{ id: 123 }])).toThrow(errorMsg);
      expect(() => wordsModule.getWordsAndFrequencies([{ data: null }])).toThrow(errorMsg);
      expect(() => wordsModule.getWordsAndFrequencies([{ data: {} }])).toThrow(errorMsg);
      expect(() => wordsModule.getWordsAndFrequencies([{ data: { body: null } }])).toThrow(errorMsg);
      expect(() => wordsModule.getWordsAndFrequencies([{ data: { body: '' } }])).toThrow(errorMsg);
      expect(() => wordsModule.getWordsAndFrequencies([{ data: { body: 123 } }])).toThrow(errorMsg);
    });

    it('should throw error if endpointsData has invalid words found in endpoints data', () => {
      const errorMsg = 'No valid words found in endpoints data';
      const stopWords = wordsModule.STOP_WORDS.join(' ');
      expect(() => wordsModule.getWordsAndFrequencies([{ data: { body: '123 ' } }])).toThrow(errorMsg);
      expect(() => wordsModule.getWordsAndFrequencies([{ data: { body: stopWords } }])).toThrow(errorMsg);
    });
  });

  describe('setFontsize', () => {
    it('should setFontSize data to a object correctly', () => {
      const wordsFrequencies = [
        { word: 'seven', frequency: 7, fontsize: '' },
        { word: 'six',   frequency: 6, fontsize: '' },
        { word: 'five',  frequency: 5, fontsize: '' },
        { word: 'four',  frequency: 4, fontsize: '' },
        { word: 'three', frequency: 3, fontsize: '' },
        { word: 'two',   frequency: 2, fontsize: '' } 
      ];
      const resultArray = wordsModule.setFontsize(wordsFrequencies);
      expect(wordsFrequencies[0].fontsize).toEqual('Huge');
      expect(wordsFrequencies[1].fontsize).toEqual('Big');
      expect(wordsFrequencies[2].fontsize).toEqual('Big');
      expect(wordsFrequencies[3].fontsize).toEqual('Normal');
      expect(wordsFrequencies[4].fontsize).toEqual('Normal');
      expect(wordsFrequencies[5].fontsize).toEqual('Small');
    });

    it('should throw error if endpointsData is empty or null', () => {
      const errorMsg = 'Missing words frequencies or no max frequency';
      expect(() => wordsModule.setFontsize([])).toThrow(errorMsg);
      expect(() => wordsModule.setFontsize(null)).toThrow(errorMsg);
    });

    it('should throw error if endpointsData has incorrect properties', () => {
      const errorMsg = 'Missing words frequencies or no max frequency';
      expect(() => wordsModule.setFontsize([{}])).toThrow(errorMsg);
      expect(() => wordsModule.setFontsize([{ id: 123 }])).toThrow(errorMsg);
      expect(() => wordsModule.setFontsize([{ frequency: null }])).toThrow(errorMsg);
      expect(() => wordsModule.setFontsize([{ frequency: {} }])).toThrow(errorMsg);
      expect(() => wordsModule.setFontsize([{ frequency: '' }])).toThrow(errorMsg);
      expect(() => wordsModule.setFontsize([{ frequency: '123' }])).toThrow(errorMsg);
    });

    it('should throw error if endpointsData has invalid words found in endpoints data', () => {
      const errorMsg = 'Missing words frequencies or no max frequency';
      expect(() => wordsModule.setFontsize([{ data: 0 }])).toThrow(errorMsg);
      expect(() => wordsModule.setFontsize([{ data: 1 }])).toThrow(errorMsg);
    });
  });
});
