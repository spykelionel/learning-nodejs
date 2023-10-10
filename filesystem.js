const fs = require('fs');

fs.stat('file.txt', (err, stats) => {
  if (err) {
    console.error(err);
  }
  // we have access to the file stats in `stats`
  console.log(stats.size)
  console.log(stats.isFile())
  console.log(stats.isDirectory())
});
