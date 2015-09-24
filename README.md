# myanmar-sort

Sorting Myanmar / Burmese text is hard! This uses a big JSON tree to help you
quickly sort in Node.js

If you are sorting names on server or client, use the myanmar-names library instead! It will remove prefixes before passing them to this module.

## Usage

If you are on the client-side, don't load this huge library! Use ```new Intl.Collator("my-MM")``` instead!

Node.js only (expect long download time)

```bash
npm install myanmar-sort
```

```javascript
var myanmarSort = require("myanmar-sort");

place1 = 'ရခိုင်ပြည်နယ်';
place2 = 'ရန်ကုန်တိုင်းဒေသကြီး';
place3 = 'ရှမ်းပြည်နယ်';
[place1, place2, place3].sort(myanmarSort);
```

You can also pass a function to retrieve the text that you sort by:

```javascript
states = [
  { name: 'ရခိုင်ပြည်နယ်' },
  { name: 'ချင်းပြည်နယ်' },
  { name: 'ရှမ်းပြည်နယ်' }
];
states.sort(myanmarSort(function (state) {
  return state.name;
}));
```

## Contributions and bugs

The JSON tree isn't complete! Please let me know if you find bugs, and add mocha tests to test/index.js

## License

Open source under an MIT license
