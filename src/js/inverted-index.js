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
    };
  }
  /**
  * Takes a string, removes unwanted symbols and returns an array
  * @param {String} string words
  * @returns {Array} returns an array
  */
  static tokenize(string) {
    const words = string.toLowerCase().replace(/[^\w+\s+]/g, '').split(' ');
    return this.filterWords(words);
  }
  /**
  * Returns an array that contains unique words from the array passed in.
  * @param {Array} words contains words
  * @returns {Array} returns an array that contains unique words
  */
  static filterWords(words) {
    return words.filter((item, position) => words.indexOf(item) === position);
  }
  /**
* Checks the content of the uploaded json file and returns
* true if the file format is the expected format
* @param {Array} file the content of the file
* @returns {boolean} returns a boolean
*/
  static isFileValid(file) {
    let check = true;
    try {
      if (!Array.isArray(file) || file.length < 1) {
        check = false;
      }
      for (let num = 0; num < file.length; num += 1) {
        if (!file[num].title || !file[num].text) {
          check = false;
        }
        if (typeof file[num].title !== 'string' ||
          typeof file[num].title !== 'string') {
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
* @param {Object} fileContent contains content of file
* @return {void}
*/
  createIndex(filename, fileContent) {
    const fileIndex = {};
    fileContent.forEach((book, index) => {
      const words = Index.tokenize(book.text);
      words.forEach((word) => {
        if (fileIndex[word]) {
          fileIndex[word].push(index);
        } else {
          fileIndex[word] = [index];
        }
      });
    });
    this.files[filename] = {};
    this.files[filename].index = fileIndex;
  }
  /**
* Returns an Index.
* @param {String} filename the name of the file
* @returns {Object} returns an object that  contains the index of the file
*/
  getIndex(filename) {
    return this.files[filename]
      ? this.files[filename].index : this.files[filename];
  }
  /**
*Searches an Index
* @param {String} term the name of the file
* @param {Array}  filename optional file name parameter
* @returns {Object} returns an object that  contains the index of the file
*/
  searchIndex(term, filename) {
    term = term.toString();
    const result = {};
    filename = filename || Object.keys(this.files);
    const searchWords = term.toLowerCase().match(/\w+/g);
    filename.forEach((file) => {
      result[file] = {};
      const fileIndex = this.files[file].index;
      searchWords.forEach((word) => {
        const indexedWords = Object.keys(fileIndex);
        if (indexedWords.includes(word)) {
          result[file][word] = fileIndex[word];
        } else {
          result[file][word] = [];
        }
      });
    });
    return result;
  }
}

