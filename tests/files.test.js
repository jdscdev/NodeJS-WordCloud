const fs = require('fs');
const filesModule = require('../modules/files');

jest.mock('fs');

describe('filesModule', () => {
  describe('writeDataToFile', () => {
    it('should write data to a file correctly', () => {
      const data = [
        { word: 'test', count: 5, size: 'Big' },
        { word: 'example', count: 3, size: 'Normal' }
      ];
      const filename = 'test_output.txt';
      const expectedOutput = 'test ,5 ,Big\nexample ,3 ,Normal';

      filesModule.writeDataToFile(data, filename);

      expect(fs.writeFileSync).toHaveBeenCalledWith(filename, expectedOutput);
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    it('should write to console when everything is correct', () => {
      const data = [
        { word: 'test', count: 5, size: 'Big' },
        { word: 'example', count: 3, size: 'Normal' }
      ];
      const consoleSpy = jest.spyOn(console, 'log');
      filesModule.writeDataToFile(data, 'test_output.txt');
      
      expect(consoleSpy).toHaveBeenCalledWith('Word Cloud saved to test_output.txt');
      
      consoleSpy.mockRestore();
    });

    it('should throw an error when data is null or null', () => {
      expect(() => filesModule.writeDataToFile(null, 'empty.txt')).toThrow('Missing data or filename');
      expect(() => filesModule.writeDataToFile([], 'empty.txt')).toThrow('Missing data or filename');
    });

    it('should throw error if filename is empty', () => {
      const data = [
        { word: 'test', count: 5, size: 'Big' },
        { word: 'example', count: 3, size: 'Normal' }
      ];
      expect(() => filesModule.writeDataToFile(data, null)).toThrow('Missing data or filename');
      expect(() => filesModule.writeDataToFile(data, '')).toThrow('Missing data or filename');
    });

    it('should handle file writing errors', () => {
      fs.writeFileSync.mockImplementation(() => { throw new Error('Permission denied'); });
      const data = [{ word: 'test', count: 5, size: 'Big' }];
      
      expect(() => filesModule.writeDataToFile(data, 'test_output.txt')).toThrow('Permission denied');
  });
  });
});
