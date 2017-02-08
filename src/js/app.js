const app = angular.module('index', ['toastr']);

app.controller('IndexController', ($scope, toastr) => {
  $scope.files = null;
  $scope.filenames = [];
  $scope.allFiles = [];
  $scope.createdIndex = [];
  $scope.showIndex = false;
  const myIndex = new Index();
  $scope.file = [];

  $scope.uploadFile = () => {
    try {
      Object.keys($scope.files).forEach((key, index) => {
        const readFile = new FileReader();
        readFile.onload = (e) => {
          const text = e.target.result;
          const fileContent = JSON.parse(text);
          if (Index.isFileValid(fileContent) === false) {
            toastr.error('Your file does not match the specified format',
              'Error');
            return;
          }
          const fileDetail = {};
          fileDetail.name = $scope.files[index].name;
          fileDetail.content = fileContent;
          $scope.allFiles.push(fileDetail);
          $scope.filenames.push($scope.files[index].name);
          toastr.success(`${$scope.files[index].name} has been uploaded`);
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

  const indexTableData = () => {
    $scope.showIndex = true;
    $scope.showSearchTable = false;
    $scope.noOfBook = new Array($scope.content.length);
  };

  $scope.createIndex = () => {
    const value = $scope.selectedFile;
    $scope.content = $scope.allFiles[value].content;
    const filename = $scope.allFiles[value].name;
    $scope.index = myIndex.getIndex(filename);

    if ($scope.index) {
      indexTableData();
    } else {
      myIndex.createIndex(filename, $scope.content);
      $scope.index = myIndex.getIndex(filename);
      $scope.createdIndex.push($scope.allFiles[value].name);
      indexTableData();
    }
  };


  $scope.searchIndex = () => {
    $scope.showIndex = false;
    $scope.showSearchTable = true;
    const value = $scope.selectedFile;

    const filename = value === 'Allfiles' ? null : $scope.allFiles[value].name;
    if (!filename) {
      $scope.index = myIndex.searchIndex($scope.searchTerm);
    } else {
      if ($scope.searchTerm === undefined) {
        toastr.error('Please enter a search word', 'Error');
        return false;
      }
      $scope.file = [];
      $scope.file.push(filename);
      const obj = $scope.allFiles[value].content;
      $scope.bookTitle = obj;
      $scope.noOfBook = new Array(obj.length);
      $scope.index = myIndex.searchIndex($scope.searchTerm,
        $scope.file);
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
