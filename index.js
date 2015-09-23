var fs = require('fs');

var myanmarCSV = null;
var myanmarCSVerror = null;

function prepare (callback) {
  if (myanmarCSV) {
    return callback(myanmarCSVerror);
  }
  fs.readFile(__dirname + '/letters.csv', { encoding: 'utf-8' }, function (err, data) {
    if (err) {
      myanmarCSVerror = err;
      return callback(err);
    }
    myanmarCSV = data.split("\n");
    callback(null);
  });
}

function myanmarSort (a, b) {
  var letters = [
    // '', no more letters goes first
    "က",
    "ခ",
    "ဂ",
    "င",
    "စ",
    "ဆ",
    "ဇ",
    "ဉ",
    "ည",
    "ဋ",
    "ဌ",
    "ဏ",
    "တ",
    "ထ",
    "ဒ",
    "န",
    "ပ",
    "ဖ",
    "ဗ",
    "ဘ",
    "မ",
    "ယ",
    "ရ",
    "လ",
    "ဝ",
    "သ",
    "ဟ",
    "အ",
    "ဥ",
    "ဦ",
  ];

  if (a === b) {
    // no comparison
    return 0;
  }

  if (letters.indexOf(a[0]) > -1 && letters.indexOf(b[0]) > -1) {
    if (a[0] !== b[0]) {
      // just look at the first letter
      return letters.indexOf(a[0]) - letters.indexOf(b[0]);
    }
  } else {
    // at least one starts without a letter... that's OK
  }

  if (!myanmarCSV) {
    // didn't load diacritic reference
    throw 'run prepare and receive callback before sorting';
  }

  var aLargest = ['', 0, -1];
  var bLargest = ['', 0, -1];

  for (var m = 0; m < myanmarCSV.length; m++) {
    if (a.length >= myanmarCSV[m].length && myanmarCSV[m].length > aLargest[1] && a.indexOf(myanmarCSV[m]) === 0) {
      aLargest = [myanmarCSV[m], myanmarCSV[m].length, m];
    }
    if (b.length >= myanmarCSV[m].length && myanmarCSV[m].length > bLargest[1] && b.indexOf(myanmarCSV[m]) === 0) {
      bLargest = [myanmarCSV[m], myanmarCSV[m].length, m];
    }
  }

  if (aLargest !== bLargest) {
    // one is better
    return aLargest[2] - bLargest[2];
  } else {
    // chop off to the next letter, and continue
    return myanmarSort(a.replace(aLargest[0], ''), b.replace(bLargest[0], ''));
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    prepare: prepare,
    sort: myanmarSort
  };
}
