const fs = require('fs');

module.exports = {
  writeDataToFile: function(data, filename) {
    if (!data || data.length < 1 || !filename) {
      throw new Error('Missing data or filename');
    }

    const output = data.map((d) => Object.values(d).join(', ')).join('\n');

    fs.writeFileSync(filename, output);

    console.log(`Word Cloud saved to ${filename}`);
  }
};
