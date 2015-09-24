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
      { name: 'ကချင်ပြည်နယ်' },
      { name: 'ကယားပြည်နယ်' },
      { name: 'ကရင်ပြည်နယ်' },
      { name: 'ချင်းပြည်နယ်' },
      { name: 'စစ်ကိုင်းတိုင်းဒေသကြီး' },
      { name: 'တနင်္သာရီတိုင်းဒေသကြီး' },
      { name: 'ပဲခူးတိုင်းဒေသကြီး' },
      { name: 'မကွေးတိုင်းဒေသကြီး' },
      { name: 'မန္တလေးတိုင်းဒေသကြီး' },
      { name: 'မွန်ပြည်နယ်' },
      { name: 'ရခိုင်ပြည်နယ်' },
      { name: 'ရန်ကုန်တိုင်းဒေသကြီး' },
      { name: 'ရှမ်းပြည်နယ်' },
      { name: 'ဧရာဝတီတိုင်းဒေသကြီး' }
    ].reverse();

    var ret = states.concat([]);
    ret = ret.sort(myanmarCollator(function(state) {
      return state.name;
    }));
    for (var r = 0; r < states.length; r++) {
      assert.equal(states[states.length - r - 1].name, ret[r].name);
    }
  });
});
