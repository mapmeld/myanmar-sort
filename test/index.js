var assert = require("assert");
var myanmarCollator = require("../index.js");

describe("sort", function() {
  it("handles an equivalent item sort", function(done) {
    myanmarCollator.prepare(function(err) {
      if (err) {
        throw err;
      }
      var ret = ['ခံခ', 'ခံခ'].sort(myanmarCollator.sort);
      assert.equal(ret[0], 'ခံခ');
      assert.equal(ret[1], 'ခံခ');
      done();
    });
  });

  it("handles a letter sort", function(done) {
    myanmarCollator.prepare(function(err) {
      if (err) {
        throw err;
      }
      var ret = ['က', 'ခ'].sort(myanmarCollator.sort);
      assert.equal(ret[0], 'က');
      assert.equal(ret[1], 'ခ');
      done();
    });
  });

  it("handles a two-letter sort", function(done) {
    myanmarCollator.prepare(function(err) {
      if (err) {
        throw err;
      }
      var ret = ['ကက', 'ကခ'].sort(myanmarCollator.sort);
      assert.equal(ret[0], 'ကက');
      assert.equal(ret[1], 'ကခ');
      done();
    });
  });

  it("handles a two-letter plus diacritic sort", function(done) {
    myanmarCollator.prepare(function(err) {
      if (err) {
        throw err;
      }
      var ret = ['ကံက', 'ကံခ'].sort(myanmarCollator.sort);
      assert.equal(ret[0], 'ကံက');
      assert.equal(ret[1], 'ကံခ');
      done();
    });
  });

  it("handles state and region sort", function(done) {
    myanmarCollator.prepare(function(err) {
      if (err) {
        throw err;
      }
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
      done();
    });
  });
});
