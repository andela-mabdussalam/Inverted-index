const app = angular.module('index', ['toastr']);

app.controller('IndexController', ($scope, toastr) => {
  $scope.names = 'mariam';
  $scope.files = null;
  $scope.filenames = [];
  $scope.allFiles = [];
  $scope.showIndex = false;
  const myIndex = new Index();

  stripExtension = (name) => {
    return name.toLowerCase().replace(/\s/g, '').split('.')[0];
  };
  $scope.uploadFile = () => {
    try {
      Object.keys($scope.files).forEach((key, index) => {
        const readFile = new FileReader();
        readFile.onload = (e) => {
          const fileName = stripExtension($scope.files[index].name);
          const text = e.target.result;
          const jsonObject = JSON.parse(text);
          if (myIndex.isValidJsonArray(jsonObject) === false) {
            toastr.error('Your file does not match the specified format',
              'Error');
            return;
          }

          $scope.filenames.push($scope.files[index].name);
          myIndex.files[fileName] = {};
          myIndex.files[fileName].books = jsonObject;
          myIndex.files.allBooks = myIndex.files.allBooks.concat(jsonObject);
          myIndex.createIndex(fileName);
          myIndex.createIndex();
          toastr.success('File uploaded');
        };
        if ($scope.filenames.includes($scope.files[index].name)) {
          toastr.error(`You have uploaded the
           ${$scope.files[index].name} before`,
            'Error');
          return;
        }
        readFile.readAsText($scope.files[index]);
      });
    } catch (err) {
      toastr.error('Pls select a file to upload', 'Error');
    }
  };


  $scope.getIndex = () => {
    $scope.showIndex = true;
    try {
      $scope.bookTitle = myIndex.bookTitle;
      if ($scope.selectedFile === 'Allfiles') {
        $scope.index = myIndex.getIndex();
        $scope.noOfBook = myIndex.allBooksNos;
        $scope.bookTitle = myIndex.allBooksTitle;
      } else {
        $scope.index = myIndex.getIndex(stripExtension($scope.selectedFile));
        $scope.noOfBook = myIndex.bookNos;
        $scope.bookTitle = myIndex.bookTitle;
      }
    } catch (err) {
      toastr.error('Enter a search word/Create an Index first', 'Error');
    }
  };

  $scope.searchIndex = () => {
    $scope.showIndex = true;
    try {
      if ($scope.selectedFile === 'Allfiles') {
        $scope.index = myIndex.searchIndex($scope.searchTerm);
      } else {
        $scope.index = myIndex.searchIndex($scope.searchTerm,
          stripExtension($scope.selectedFile));
      }
    } catch (err) {
      toastr.error('Pls enter a search word', 'Error');
    }
  };
});

app.directive('uploadFile', ($parse) => {
  return {
    restrict: 'A',
    link: (scope, elem) => {
      elem.bind('change', () => {
        $parse('files').assign(scope, elem[0].files);
      });
    }
  };
});
