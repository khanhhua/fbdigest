import angular from 'angular';
import ngRoute from 'angular-route';
import 'angular-facebook';

import template from './template.html';

const mod = angular.module('app.timeline', [ngRoute, 'facebook']);

function TimelineCtrl ($scope, fb) {

}
TimelineCtrl.$inject = ['$scope', 'Facebook'];

mod.config(['$routeProvider',
  ($routeProvider) => {
    $routeProvider.when('/timeline', {
      controller: TimelineCtrl,
      template
    });
  }
]);

export default mod.name;