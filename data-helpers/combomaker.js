var fs = require('fs');

function myanmarSort (a, b) {
  var letters = [
    'ခ',
    'င',
    'က',
    'ည',
    'န',
    'လ',
    'တ',
    'မ',
    'အ',
    'စ',
    'ဝ',
    'ဆ',
    'ဇ',
    'ဌ',
    'ရ',
    'ထ',
    'ယ',
    'သ',
    'ဖ',
    'ဘ',
    'ဗ',
    'ဟ',
    'ဒ',
    'ပ',
    'ဂ',
    'ဥ',
    'ဉ',
    'ဏ',
    'ဋ',
    'ဦ',
    'ဧ'
  ];
  var diacritics = [
    'ြ',
    'ွ',
    'ှ',
    'ျ',
    'ေ',
    'ီ',
    'ဲ',
    'ာ',
    'ိ',
    'ူ',
    'ု',
    'ါ',
    'ံ',
    '်',
    '့',
    'း'
  ];
  var plus = '္';

  var endings = [''];

  function addDiacritics (lastEndings) {
    var newEndings = [];
    for (var e = 0; e < lastEndings.length; e++) {
      for (var d = lastEndings[0].length; d < diacritics.length; d++) {
        if (lastEndings[e].indexOf(diacritics[d]) === -1) {
          newEndings.push(lastEndings[e] + diacritics[d]);
        }
      }
    }
    return newEndings;
  }

  var lastEndings = ['']

  for (var diacriticCount = 1; diacriticCount < diacritics.length && diacriticCount < 5; diacriticCount++) {
    lastEndings = addDiacritics(lastEndings);
    endings = endings.concat(lastEndings);
    console.log(endings.length);
  }

  var letterPlusEnd = [];
  for (var l = 0; l < 1; l++) {
    var letterStuff = endings.map(function (ending) {
      return letters[l] + ending;
    });
    letterPlusEnd = letterPlusEnd.concat(letterStuff);
    console.log(letters[l] + "-" + letterPlusEnd.length);
    for (var l2 = 0; l2 < letters.length; l2++) {
      var letterStuff = endings.map(function (ending) {
        return letters[l] + ending + letters[l2];
      });
      letterPlusEnd = letterPlusEnd.concat(letterStuff);
    }
  }

  fs.writeFile('letters.csv', letterPlusEnd.join("\n"), function (err) {
    if (err) {
      throw err;
    }
    console.log('done: ' + letterPlusEnd.length);
  });

  //var collator = new Intl.Collator('MM-my');
  //letterPlusEnd.sort(collator);
  //console.log(letterPlusEnd);
}

myanmarSort();

module = {
  exports: myanmarSort
}
