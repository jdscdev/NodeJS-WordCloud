const fs = require('fs');

module.exports = {
  write: function(endpointsData, filename) {
    if (endpointsData && endpointsData.length) {
      const output = endpointsData.map(({ word, frequency, fontsize }) => `${word}, ${frequency}, ${fontsize}`).join('\n');

      fs.writeFileSync(filename, output);
      console.log(`Word Cloud saved to ${filename}`);
    } else {  
      console.log('No data to write');
    }
  }
};
