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
      const isValid = index.isValidJsonArray(file);
      expect(isValid).toBe(false);
    });
    it('should return false if the json file is empty', () => {
      const isValid = index.isValidJsonArray(empty);
      expect(isValid).toBe(false);
    });
    it('should return true if the file content is a valid json array', () => {
      const isValid = index.isValidJsonArray(books);
      expect(isValid).toBe(true);
    });
    it('should return false if the file content is not a json array', () => {
      const isValid = index.isValidJsonArray(notArray);
      expect(isValid).toBe(false);
    });
    it('should return true if file format is as expected', () => {
      const isValid = index.isValidJsonArray(books);
      expect(isValid).toBe(true);
    });
    it('should return false if the file format is not as expected', () => {
      const valid = index.isValidJsonArray(book2);
      expect(valid).toBe(false);
    });
    it('should return false if value of the array property is not a string',
      () => {
        const valid = index.isValidJsonArray(badFile);
        expect(valid).toBe(false);
      });
  });

  describe('Populate Index', () => {
    const index2 = new Index();
    index2.files.key = {};
    index2.files.key.books = testFile;
    index2.createIndex('key');
    index2.files.allBooks = testFile;
    index2.createIndex();

    it('should verify that key has been created', () => {
      expect(Object.prototype.hasOwnProperty.call(index2.files.key, 'index')).toBe(true);
    });
    it('should check that index maps the string to the correct objects', () => {
      expect(index2.getIndex('key')).toEqual({ a: [0], full: [0], powerful: [1], ring: [1], world: [0] });
    });
    it('should check that it returns an index if no filename is not given', () => {
      expect(index2.getIndex()).toEqual({ a: [0], full: [0], powerful: [1], ring: [1], world: [0] });
    });
    it('should check that the array returned contains unique words', () => {
      expect(index2.filterWords(['a', 'a'])).toEqual(['a']);
    });
    it('should set the index key for a filename', () => {
      index2.files.key2 = {};
      index2.setIndex({ a: [1, 2, 3], b: [0, 1] }, 'key2');
      expect(index2.files.key2.index).toEqual({ a: [1, 2, 3], b: [0, 1] });
    });
    it('should set the index for all files', () => {
      const index3 = new Index();
      index3.setIndex({ a: [1, 2, 3], b: [0, 1] });
      expect(index3.files.allBooksIndex).toEqual({ a: [1, 2, 3], b: [0, 1] });
    });
    it('should get the books for a filename', () => {
      const book = index2.getBooks('key');
      expect(book).toEqual(testFile);
    });
    it('should get all the books', () => {
      const book = index2.getBooks();
      expect(book).toEqual(testFile);
    });
  });

  describe('Search Index', () => {
    const index3 = new Index();
    index3.files.key = {};
    index3.files.key.books = books;
    index3.createIndex('key');

    index3.files.allBooks = {};
    index3.files.allBooks = books;
    index3.createIndex();
    it('should return an arrray of indexes of the searched word', () => {
      expect(index3.searchIndex('alice', 'key')).toEqual({ Alice: [0] });
      expect(index3.searchIndex('of', 'key')).toEqual({ of: [0, 1] });
    });
    it('should return search result if array is passed as term', () => {
      expect(index3.searchIndex(['alice'], 'key')).toEqual({ Alice: [0] });
      expect(index3.searchIndex(['of', 'alice'], 'key')).toEqual({
        Alice: [0], of: [0, 1]
      });
    });
    it('should return search result if multidimensional array is passed as search term', () => {
      expect(index3.searchIndex(['of', ['alice']], 'key')).toEqual({
        Alice: [0], of: [0, 1]
      });
    });
    it('should return search result if a file name is not specified', () => {
      expect(index3.searchIndex('alice')).toEqual({ Alice: [0] });
      expect(index3.searchIndex(['of', 'alice'], 'key')).toEqual({
        Alice: [0], of: [0, 1]
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