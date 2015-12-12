require('./node_modules/angular-material/angular-material.css')

const angular = require('angular')
const ngRoute = require('angular-route')
const ngMaterial = require('angular-material')

const app = angular.module('signum', [ngRoute, ngMaterial])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/section/:section', {
            templateUrl: 'partials/section.html',
            controller: 'SectionController'
        })
        .when('/section/:section/:problem', {
            templateUrl: 'partials/problem.html',
            controller: 'ProblemController'
        })
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomePageController'
        })
        .otherwise({
            redirectTo: '/home'
        })
}])

app.service('SectionService', [function () {
    var sections = {
        1: {
            name: 'hello world'
        }
    }
    return {
        getSection: function (index) {
            return sections[index]
        },
        setSection: function (index, value) {
            sections[index] = value
        },
        getSections: function () {
            return angular.copy(sections)
        }
    }
}])

app.controller('HomePageController', ['$scope', '$timeout', 'SectionService', function ($scope, $timeout, SectionService) {
    $scope.helloWorld = 'hi'
    $timeout(function () {
        $scope.helloWorld = ''
    }, 2000)
    $scope.sections = SectionService.getSections()
}])

app.controller('SectionController', ['$scope', '$routeParams', 'SectionService', function ($scope, $routeParams, SectionService) {
    $scope.section = SectionService.getSection($routeParams.section)
}])

app.controller('ProblemController', ['$scope', function ($scope) {

}])