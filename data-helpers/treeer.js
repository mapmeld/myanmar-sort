var fs = require('fs');

fs.readFile('./letters.csv', { encoding: 'utf-8' }, function (err, data) {
  if (err) {
    throw err;
  }
  var match = data.split("\n");
  var tree = {};
  for (var m = 0; m < match.length; m++) {
    var treePosition = tree;
    for (var c = 0; c < match[m].length; c++) {
      if (!treePosition[match[m][c]]) {
        treePosition[match[m][c]] = {};
      }
      treePosition = treePosition[match[m][c]]
    }
    treePosition["x"] = m;
  }
  fs.writeFile('../letters.json', JSON.stringify(tree), function (err) {
    if (err) {
      throw err;
    }
    console.log('done');
  });
});
