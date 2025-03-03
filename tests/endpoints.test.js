const axios = require('axios');
const endpointsModule = require('../modules/endpoints');

jest.mock('axios');

describe('endpointsModule', () => {
  describe('getURLs', () => {
    it('should generate correct URLs', () => {
      const baseUrl = 'https://example.com/data/';
      const count = 5;
      const expectedUrls = [
        'https://example.com/data/1',
        'https://example.com/data/2',
        'https://example.com/data/3',
        'https://example.com/data/4',
        'https://example.com/data/5'
      ];
      expect(endpointsModule.getURLs(baseUrl, count)).toEqual(expectedUrls);
    });

    it('should throw an error when baseUrl is empty or null', async () => {
      expect(() => endpointsModule.getURLs('', 5)).toThrow('Missing baseUrl or count');
      expect(() => endpointsModule.getURLs(null, 5)).toThrow('Missing baseUrl or count');
    });

    it('should throw an error when count is empty or null', async () => {
      expect(() => endpointsModule.getURLs('https://example.com/data/', 0)).toThrow('Missing baseUrl or count');
      expect(() => endpointsModule.getURLs('https://example.com/data/', null)).toThrow('Missing baseUrl or count');
      expect(() => endpointsModule.getURLs('https://example.com/data/', -1)).toThrow('Missing baseUrl or count');
    });
  });

  describe('fetchData', () => {
    it('should fetch data from given URLs', async () => {
      const baseUrl = 'https://example.com/data/';
      const count = 3;
      const mockResponse = [{ data: 'test1' }, { data: 'test2' }, { data: 'test3' }];
      axios.get.mockResolvedValueOnce(mockResponse[0])
               .mockResolvedValueOnce(mockResponse[1])
               .mockResolvedValueOnce(mockResponse[2]);
      
      const responses = await endpointsModule.fetchData(baseUrl, count);
      expect(responses).toEqual(mockResponse);
      expect(axios.get).toHaveBeenCalledTimes(3);
    });

    it('should handle API request errors', async () => {
      axios.get.mockImplementation(() => { throw new Error('Request failed'); });
      await expect(endpointsModule.fetchData('https://example.com/data/', 1)).rejects.toThrow('Request failed');
    });
  });
});
