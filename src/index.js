import angular from 'angular';
import ngRoute from 'angular-route';
import 'angular-facebook';

import login from './components/login';
import timeline from './components/timeline';

var app = angular.module('app', [ngRoute, 'facebook', login, timeline]);

app.config([
  'FacebookProvider',(fbProvider) => {
    fbProvider.init('1888205801410351');
  }
])

app.run(function () {
  console.log('App has been running...');
});

console.log('Hello World');