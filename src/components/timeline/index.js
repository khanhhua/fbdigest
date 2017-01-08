import angular from 'angular';
import ngRoute from 'angular-route';
import 'angular-facebook';

import tabs from 'angular-ui-bootstrap/src/tabs';

import template from './template.html';

const mod = angular.module('app.timeline', [ngRoute, 'facebook', tabs]);

function TimelineCtrl ($q, $scope, fb, $http) {
  $scope.active = 0;

  $scope.feeds = {
    pictures:[],
    stati: [],
    shares: [],
    media: [],
    others: []
  };

  fb.getLoginStatus(res => {
    if (res.status === 'connected') {
      refreshFeeds().then(feeds => {
        console.log(feeds);

        $scope.feeds = aggregate(feeds);
      });
    }
  });

  function refreshFeeds () {
    console.log(fb);
    var feeds = [];
    var deferred = $q.defer();

    fb.api('/me/feed', {access_token: FB.getAccessToken()}, res => {
      if (!('data' in res)) {
        return;
      }

      const {data} = res;
      feeds = feeds.concat(data);

      if (res.paging && res.paging.next) {
        $http.get(res.paging.next).then(res => {
          if (!('data' in res.data)) {
            deferred.resolve(feeds);
            return;
          }

          const {data} = res.data;
          feeds = feeds.concat(data);

          deferred.resolve(feeds);
        })
      }
      else {
        deferred.resolve(feeds);
      }
    });

    return deferred.promise;
  }

  function aggregate (feeds) {
    return feeds.reduce(
        (acc, datum) => {
        if (isPicture(datum)) {
          acc.pictures.push(datum);
        }
        else if (isStatus(datum)) {
            acc.stati.push(datum);
        }
        else if (isShare(datum)) {
          acc.shares.push(datum);
        }
        else if (isMedia(datum)) {
          acc.media.push(datum);
        }
        else if (isOther(datum)) {
          acc.others.push(datum);
        }

        return acc;
      }, $scope.feeds);
  }

  function isPicture (post) {
    return false;
  }

  function isStatus (post) {
    return !!post.message;
  }

  function isShare (post) {
    return post.story && post.story.indexOf('shared') !== -1;
  }

  function isMedia (post) {
    return false;
  }

  function isOther (post) {
    return true;
  }
}
TimelineCtrl.$inject = ['$q','$scope', 'Facebook', '$http'];

mod.config(['$routeProvider',
  ($routeProvider) => {
    $routeProvider.when('/timeline', {
      controller: TimelineCtrl,
      template
    });
  }
]);

export default mod.name;