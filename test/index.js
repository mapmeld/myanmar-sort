var assert = require("assert");
var myanmarCollator = require("../index.js");

describe("sort", function() {
  it("handles an equivalent item sort", function() {
    var ret = ['ခံခ', 'ခံခ'].sort(myanmarCollator);
    assert.equal(ret[0], 'ခံခ');
    assert.equal(ret[1], 'ခံခ');
  });

  it("handles a letter sort", function() {
    var ret = ['က', 'ခ'].sort(myanmarCollator);
    assert.equal(ret[0], 'က');
    assert.equal(ret[1], 'ခ');
  });

  it("handles a two-letter sort", function() {
    var ret = ['ကက', 'ကခ'].sort(myanmarCollator);
    assert.equal(ret[0], 'ကက');
    assert.equal(ret[1], 'ကခ');
  });

  it("handles a two-letter plus diacritic sort", function() {
    var ret = ['ကံက', 'ကံခ'].sort(myanmarCollator);
    assert.equal(ret[0], 'ကံက');
    assert.equal(ret[1], 'ကံခ');
  });

  it("handles state and region sort", function() {
    var states = [
      'ကချင်ပြည်နယ်',
      'ကယားပြည်နယ်',
      'ကရင်ပြည်နယ်',
      'ချင်းပြည်နယ်',
      'စစ်ကိုင်းတိုင်းဒေသကြီး',
      'တနင်္သာရီတိုင်းဒေသကြီး',
      'ပဲခူးတိုင်းဒေသကြီး',
      'မကွေးတိုင်းဒေသကြီး',
      'မန္တလေးတိုင်းဒေသကြီး',
      'မွန်ပြည်နယ်',
      'ရခိုင်ပြည်နယ်',
      'ရန်ကုန်တိုင်းဒေသကြီး',
      'ရှမ်းပြည်နယ်',
      'ဧရာဝတီတိုင်းဒေသကြီး'
    ];
    var ret = states.concat([]).sort(myanmarCollator.sort);
    for (var r = 0; r < states.length; r++) {
      states[r] === ret[r];
    }
  });
});
