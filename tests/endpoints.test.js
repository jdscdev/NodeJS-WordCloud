const axios = require('axios');
const endpoints = require('../modules/endpoints'); // Adjust path accordingly

jest.mock('axios');

describe('endpoints', () => {
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
      expect(endpoints.getURLs(baseUrl, count)).toEqual(expectedUrls);
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
      
      const responses = await endpoints.fetchData(baseUrl, count);
      expect(responses).toEqual(mockResponse);
      expect(axios.get).toHaveBeenCalledTimes(3);
    });

    it('should throw an error when baseUrl or count is missing', async () => {
      await expect(endpoints.fetchData('', 5)).rejects.toThrow('Missing baseUrl or count');
      await expect(endpoints.fetchData('https://example.com/data/', 0)).rejects.toThrow('Missing baseUrl or count');
    });

    it('should handle API request errors', async () => {
      axios.get.mockRejectedValueOnce(new Error('Request failed'));
      await expect(endpoints.fetchData('https://example.com/data/', 1)).rejects.toThrow('Error fetching endpoints: Request failed');
    });
  });
});
