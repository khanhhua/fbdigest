import angular from 'angular';
import 'angular-facebook';

import template from './template.html';

const mod = angular.module('app.login', ['facebook']);

function LoginCtrl ($scope, $location, fb) {
  console.log('[LoginCtrl] ...');

  $scope.isEnabled = false;
  $scope.errorMessage = null;

  $scope.$watch(
    function () {
      return fb.isReady();
    },
    function (newVal) {
      $scope.isEnabled = newVal;
    }
  );

  $scope.onLoginClick = () => {
    if (!fb.isReady()) {
      return;
    }

    console.log('[onLoginClick] ...');
    fb.login(response => {
      debugger;

      let {status} = response;
      if (status === 'connected') {
        console.info('[onLoginClick] Redirecting to /timeline...');
        $location.path('/timeline');
        return;
      }
      else {
        $scope.errorMessage = 'Could not connect with Facebook';
      }
    });
  };
}
LoginCtrl.$inject = ['$scope', '$location','Facebook'];

mod.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/', {
      controller: LoginCtrl,
      template
    })
  }])

export default mod.name;