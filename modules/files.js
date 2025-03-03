const fs = require('fs');

module.exports = {
  write: function(endpointsData, filename) {
    if (endpointsData && endpointsData.length) {
      const output = endpointsData.map(({ data }) => `${data.id}, ${data.title}`).join('\n');

      fs.writeFileSync(filename, output);
      console.log(`Word Cloud saved to ${filename}`);
    } else {  
      console.log("No data to write");
    }
  }
};
