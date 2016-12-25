(function() {
    'use strict';
    var module = angular.module('LunchCheck', []);
    module.controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope', '$filter'];

    var defaultTextColor = "black";
    var defaultBorderColor = "#ccc";
    var validColor = "green";
    var invalidColor = "red";

    var defaultMessage = "";
    var emptyMessage = "Please enter data first";
    var validMessage = "Enjoy!";
    var invalidMessage = "Too much!";

    var States = {
        DEFAULT: 0,
        EMPTY: 1,
        VALID: 2,
        INVALID: 3,

        properties: {
            0: { textColor: defaultTextColor, borderColor: defaultBorderColor, message: defaultMessage },
            1: { textColor: defaultTextColor, borderColor: invalidColor, message: emptyMessage },
            2: { textColor: validColor, borderColor: validColor, message: validMessage },
            3: { textColor: invalidColor, borderColor: invalidColor, message: invalidMessage },
        }
    };

    function LunchCheckController($scope, $filter) {
        $scope.text = "";
        $scope.list = [];
        $scope.count = 0;
        $scope.state = States.DEFAULT;
        $scope.message = States.properties[States.DEFAULT].message;
        $scope.textColor = States.properties[States.DEFAULT].textColor;
        $scope.borderColor = States.properties[States.DEFAULT].borderColor;

        $scope.reset = function() {
            changeState(States.DEFAULT);
        };

        $scope.check = function() {
            var state = validate($scope.list);
            changeState(state);
        };

        $scope.keyUp = function() {
            var text = $scope.text;
            $scope.list = tokenize(text);
            $scope.count = $scope.list.length;
        };

        function changeState(newState) {
            $scope.state = newState;
            $scope.message = States.properties[newState].message;
            $scope.textColor = States.properties[newState].textColor;
            $scope.borderColor = States.properties[newState].borderColor;
        }
    }

    function tokenize(text) {
        if (text.length == 0) {
            return [];
        }
        var list = text.split(',');
        return removeEmptyDishes(list);
    }

    function removeEmptyDishes(list) {
        var newList = [];
        for (var i = 0; i < list.length; i++) {
            var dish = list[i];
            // trim spaces
            dish = dish.trim();
            if (dish.length > 0) {
                newList.push(dish);
            }
        }
        return newList;
    }

    function validate(list) {
        if (list.length == 0) {
            return States.EMPTY;
        } else if (list.length <= 3) {
            return States.VALID;
        } else {
            return States.INVALID;
        }
    }
})();