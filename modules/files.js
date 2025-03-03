const fs = require('fs');

module.exports = {
  writeDataToFile: function(data, filename) {
    if (data && data.length) {
      const output = data.map((d) => Object.values(d).join(' ,')).join('\n');

      fs.writeFileSync(filename, output);
      console.log(`Word Cloud saved to ${filename}`);
    } else {  
      console.log('No data to write');
    }
  }
};
