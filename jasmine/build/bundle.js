(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": 2,
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],3:[function(require,module,exports){
module.exports=[
  {
    "temp": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "touch": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]


},{}],4:[function(require,module,exports){
module.exports=[]

},{}],5:[function(require,module,exports){
module.exports={
  "file1": {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  "file2": {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
}

},{}],6:[function(require,module,exports){
const books = require('../books.json');
const book2 = require('../books2.json');
const empty = require('../empty.json');
const notArray = require('../notArray.json');
const badFile = require('../badFile.json');
const testFile = require('../test.json');

const file = null;

describe('Inverted Index ', () => {
  const index = new Index();
  it('should be truthy for the instance of the class', () => {
    expect(index instanceof Index).toBeTruthy();
  });

  describe('Read Book Data', () => {
    it('should return false if the json file is empty', () => {
      const isValid = Index.isFileValid(file);
      expect(isValid).toBe(false);
    });

    it('should return false if the json file is empty', () => {
      const isValid = Index.isFileValid(empty);
      expect(isValid).toBe(false);
    });

    it('should return true if the file content is a valid json array', () => {
      const isValid = Index.isFileValid(books);
      expect(isValid).toBe(true);
    });

    it('should return false if the file content is not a json array', () => {
      const isValid = Index.isFileValid(notArray);
      expect(isValid).toBe(false);
    });

    it('should return true if file format is as expected', () => {
      const isValid = Index.isFileValid(books);
      expect(isValid).toBe(true);
    });

    it('should return false if the file format is not as expected', () => {
      const valid = Index.isFileValid(book2);
      expect(valid).toBe(false);
    });

    it('should return false if value of the array property is not a string',
      () => {
        const valid = Index.isFileValid(badFile);
        expect(valid).toBe(false);
      });
  });

  describe('Populate Index', () => {
    index.createIndex('key', testFile);

    it('should verify that key has been created', () => {
      expect(Object.prototype.hasOwnProperty
        .call(index.files.key, 'index')).toBe(true);
    });

    it('should check that index maps the string to the correct objects', () => {
      expect(index.getIndex('key')).toEqual({
        a: [0], full: [0], powerful: [1], ring: [1], world: [0]
      });
    });

    it('should check that the array returned contains unique words', () => {
      expect(Index.filterWords(['a', 'a'])).toEqual(['a']);
    });

    it('should not override the index for key', () => {
      expect(index.getIndex('key')).toEqual({
        a: [0], full: [0], powerful: [1], ring: [1], world: [0]
      });

      expect(index.getIndex('key')).toEqual({
        a: [0], full: [0], powerful: [1], ring: [1], world: [0]
      });
    });
  });

  describe('Search Index', () => {
    index.createIndex('book', books);

    it('should return an arrray of indexes of the searched word', () => {
      expect(index.searchIndex('alice',
        ['book'])).toEqual({ book: { alice: [0] } });

      expect(index.searchIndex('of',
        ['book'])).toEqual({ book: { of: [0, 1] } });
    });

    it('should return search result if array is passed as term', () => {
      expect(index.searchIndex(['alice'],
        ['book'])).toEqual({ book: { alice: [0] } });

      expect(index.searchIndex(['of', 'alice'], ['book'])).toEqual({
        book: {
          alice: [0], of: [0, 1]
        }

      });
    });

    it('should return search result if multidimensional array is passed'
      , () => {
        expect(index.searchIndex(['of', ['alice']], ['book'])).toEqual({
          book: {
            alice: [0], of: [0, 1]
          }
        });
      });

    it('should return search result if a file name is not specified', () => {
      expect(index.searchIndex('alice')).toEqual({
        key: { alice: [] },
        book: { alice: [0] }
      });
      expect(index.searchIndex(['of', 'alice'], ['book'])).toEqual({
        book: {
          alice: [0], of: [0, 1]
        }
      });
    });
  });
});


},{"../badFile.json":1,"../books.json":2,"../books2.json":3,"../empty.json":4,"../notArray.json":5,"../test.json":7}],7:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "a world full."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "powerful ring"
  }
]

},{}]},{},[6])