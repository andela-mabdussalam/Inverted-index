# Inverted-index
[![Build Status](https://travis-ci.org/andela-mabdussalam/Inverted-index.svg?branch=master)](https://travis-ci.org/andela-mabdussalam/Inverted-index)
[![Code Climate](https://codeclimate.com/github/andela-mabdussalam/Inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-mabdussalam/Inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-mabdussalam/Inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-mabdussalam/Inverted-index?branch=develop)
# Inverted-Index
An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

Inverted index object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

## Usage
* Clone the repository `git clone https://github.com/andela-mabdussalam/Inverted-index
* Run `npm install` to install all dependencies.
* To run test, run `npm test`
* To use inverted index, run `gulp` and go to `localhost://3000`
* Upload your file(s).
* Select a file from the uploaded files and click on *create index* to get an index of the selected file.
* To search the created index of a file, select file and enter the word(s) you want to search in the search box.
* Click on *search* to see your result.


## Technologies and Services
Written in Javascript es6 syntax and nodejs on the backend, with the followinng:
* Jasmine (Test runner)
* Gulp (Task runner)
* Karma (Generate tests and coverage)
* Anjular js (Frontend views)
* Travic CI (Continious Integration)
* Coveralls (Test coverage percentage)
* Hound CI (Check for style violations)
* HTML/CSS (Frontend)
* Code Climate

## Contributions
* Clone the repository.
* Create a new branch for included feature(s).
* Raise a pull request.
