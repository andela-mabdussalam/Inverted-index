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
    try {
      if (!Array.isArray(file) || file.length < 1) {
        return false;
      }
      for (let i = 0; i < file.length; i += 1) {
        if (!file[i].title || !file[i].text) {
          return false;
        }
        if (typeof file[i].title !== 'string' ||
          typeof file[i].title !== 'string') {
          return false;
        }
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  /**
* Creates an index of files uploaded.
* @param {String} filename the name of the file
*/
  createIndex(filename) {
    let books;
    let file;
    const noOfBooks = [];
    const bookTitle = [];
    if (!filename) {
      books = this.files.allBooks;
    } else {
      file = this.files[filename];
      books = file.books;
    }
    const fileIndex = {};
    books.forEach((book, index) => {
      bookTitle.push(book.title);
      noOfBooks.push(index);
      const text = this.tokenize(book.text);
      const uniqueArray = text.filter((item, position) => {
        return text.indexOf(item) === position;
      });
      uniqueArray.forEach((word) => {
        if (fileIndex[word]) {
          fileIndex[word].push(index);
        } else {
          fileIndex[word] = [index];
        }
      });
    });
    if (!filename) {
      this.files.allBooksIndex = fileIndex;
      this.files.length = noOfBooks;
      this.files.allBooksTitle = bookTitle;
    } else {
      this.files[filename].index = fileIndex;
      this.files[filename].length = noOfBooks;
      this.files[filename].bookTitle = bookTitle;
    }
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
    if (Array.isArray(term)) {
      term = term.join(',').split(',').join(' ');
    }
    let object;
    const searchWords = term.toLowerCase().match(/\w+/g);

    const result = {};
    if (!filename) {
      object = this.files.allBooksIndex;
    } else {
      object = this.files[filename].index;
    }
    searchWords.forEach((word) => {
      Object.keys(object).forEach((index) => {
        const re = new RegExp(`\\b${word}\\b`, 'i');
        if (re.test(index)) {
          result[index] = object[index];
        }
      });
    });
    return result;
  }
}

