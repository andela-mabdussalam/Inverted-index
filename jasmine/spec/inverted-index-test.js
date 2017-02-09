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

