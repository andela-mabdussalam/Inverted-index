/* eslint class-methods-use-this: "off" */
/* eslint no-unused-vars: "off" */

/** Class representing a index. */
class Index {
  /**
   * @constructor
   */
  constructor() {
    // stores all created file indexes
    this.files = {
      // 'rax': {books: []}
      allBooks: []
    };
  }
  /**
  * Takes a string, removes unwanted symbols and returns an array
  * @param {String} string words
  * @returns {Array} returns an array
  */
  tokenize(string) {
    return string.replace(/[.,'':]/g, '').split(' ');
  }

  /**
* Checks the content of the uploaded json file and returns
* true if the file format is the expected format
* @param {Array} file the content of the file
* @returns {boolean} returns a boolean
*/
  isValidJsonArray(file) {
    let check = true;
    try {
      if (!Array.isArray(file) || file.length < 1) {
        check = false;
      }
      for (let i = 0; i < file.length; i += 1) {
        if (!file[i].title || !file[i].text) {
          check = false;
        }
        if (typeof file[i].title !== 'string' ||
          typeof file[i].title !== 'string') {
          check = false;
        }
      }
    } catch (err) {
      check = false;
    }
    return check;
  }
  /**
* Creates an index of files uploaded.
* @param {String} filename the name of the file
*/
  createIndex(filename) {
    const books = this.getBooks(filename);
    const fileIndex = {};
    books.forEach((book, index) => {
      const text = this.tokenize(book.text);
      const words = this.filterWords(text);
      words.forEach((word) => {
        if (fileIndex[word]) {
          fileIndex[word].push(index);
        } else {
          fileIndex[word] = [index];
        }
      });
    });

    this.setIndex(fileIndex, filename);
  }
  /**
* Returns an Index.
* @param {String} filename the name of the file
* @returns {Object} returns an object that  contains the index of the file
*/
  getIndex(filename) {
    if (!filename) {
      return this.files.allBooksIndex;
    }
    return this.files[filename].index;
  }
  /**
*Searches an Index
* @param {String} term the name of the file
* @param {String}  filename optional file name parameter
* @returns {Object} returns an object that  contains the index of the file
*/
  searchIndex(term, filename = null) {
    term = term.toString();
    let fileIndex;
    const searchWords = term.toLowerCase().match(/\w+/g);
    const result = {};
    if (!filename) {
      fileIndex = this.files.allBooksIndex;
    } else {
      fileIndex = this.files[filename].index;
    }
    searchWords.forEach((word) => {
      Object.keys(fileIndex).forEach((indexWord) => {
        const re = new RegExp(`\\b${word}\\b`, 'i');
        if (re.test(indexWord)) {
          result[indexWord] = fileIndex[indexWord];
        }
      });
    });
    return result;
  }
  /**
* Returns the books in a file if the filename is passed and returns all
* the books if the filename is not passed.
* @param {String} filename the name of the file
* @returns {Array} returns an array that contains the books
*/
  getBooks(filename) {
    let books;
    if (!filename) {
      books = this.files.allBooks;
    } else {
      books = this.files[filename].books;
    }
    return books;
  }
/**
* Returns an array that contains unique words from the array that was passed in.
* @param {Array} words contains words
* @returns {Array} returns an array that contains unique words
*/
  filterWords(words) {
    return words.filter((item, position) => {
      return words.indexOf(item) === position;
    });
  }
/**
* Sets the index key for a filename or sets the index for all files.
* @param {Object} index contains the words as key and array of file indices as * the value
* @param {String} filename name of the file
* @returns {null}
*/
  setIndex(index, filename) {
    if (!filename) {
      this.files.allBooksIndex = index;
    } else {
      this.files[filename].index = index;
    }
  }
}

