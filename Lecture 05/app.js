(function() {
    'use strict';

    angular.module('myFirstApp', [])
        .controller('MyFirstController', function($scope) {
            $scope.name = 'Moraly';
            $scope.title = 'Mr.';
            $scope.sayHello = function() {
                return "Hello ";
            };
        });
})();