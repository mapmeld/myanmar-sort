var sortables = require(__dirname + '/letters.json')

function myanmarSort (a, b) {
  if (typeof a === 'function' && typeof b === 'undefined') {
    // passing a function to obtain values
    // return a myanmarSort function
    return function (aobj, bobj) {
      var aval = a(aobj);
      var bval = a(bobj);
      return myanmarSort(aval, bval);
    }
  }

  var letters = [
    // '', no more letters goes first
    'က',
    'ခ',
    'ဂ',
    'င',
    'စ',
    'ဆ',
    'ဇ',
    'ဉ',
    'ည',
    'ဋ',
    'ဌ',
    'ဏ',
    'တ',
    'ထ',
    'ဒ',
    'န',
    'ပ',
    'ဖ',
    'ဗ',
    'ဘ',
    'မ',
    'ယ',
    'ရ',
    'လ',
    'ဝ',
    'သ',
    'ဟ',
    'အ',
    'ဥ',
    'ဦ',
    'ဧ'
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

  var findInTree = function (a) {
    var treePos = sortables;
    var aLargest = ['', 0, -1];
    for (var ax = 0; ax < a.length; ax++) {
      if (treePos[a[ax]]) {
        aLargest[0] += a[ax];
        treePos = treePos[a[ax]];
      } else {
        aLargest[1] = aLargest[0].length;
        aLargest[2] = treePos['x'];
        break;
      }
    }
    return aLargest;
  };

  var aLargest = findInTree(a);
  var bLargest = findInTree(b);

  if (aLargest[2] !== bLargest[2]) {
    // one is better
    return aLargest[2] - bLargest[2];
  } else if (aLargest[0].length === 0) {
    // remove this foreign letter
    return myanmarSort(a.substring(1), b.substring(1));
  } else {
    // chop off to the next letter, and continue
    return myanmarSort(a.replace(aLargest[0], ''), b.replace(bLargest[0], ''));
  }
}

if (typeof module !== 'undefined') {
  module.exports = myanmarSort;
}
