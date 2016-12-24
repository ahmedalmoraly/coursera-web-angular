(function() {
    'use strict';

    angular.module('NameCalculator', [])
        .controller('NameCalculatorController', function($scope) {
            $scope.name = "";
            $scope.totalValue = 0;

            $scope.displayNumeric = function() {
                var totalValue = calculateNumericForString($scope.name);
                $scope.totalValue = totalValue;
            };
        });

    function calculateNumericForString(string) {
        var totalValue = 0;
        for (var i = 0; i < string.length; i++) {
            totalValue += string.charCodeAt(i);
        }
        return totalValue;
    }
})();