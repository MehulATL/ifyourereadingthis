angular.module('app', [
  'ionic',
  'ngCordova'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: "/home",
    abstract: false,
    controller: 'homeCtrl',
    templateUrl: "app/app.tpl.html"
  });
  $urlRouterProvider.otherwise('/home');
})

.controller('homeCtrl', function($scope, $q, $timeout, $ionicPopup, $cordovaSocialSharing) {
  console.log('home');

  var share = function(path) {
    $cordovaSocialSharing
    .shareViaTwitter('If You\'re Reading This... #IYRT', path, 'http://goo.gl/y1Ml0E')
    .then(function(result) {
      console.log('share result ', result);
    }, function(err) {
      console.log('share err', err);
    });
  };

  var screen = function() {
    var dfd = $q.defer();

    navigator.screenshot.save(function(error,res){
      if (error) {
        console.error(error);
        dfd.reject(error);
      } else {
        console.log('ok', res.filePath);
        dfd.resolve(res);
      }
    });
    
    return dfd.promise;
  };

  $scope.fuck = function() {
    var sharePopup = $ionicPopup.confirm({
      title: 'Share with Twitter?',
    });
    sharePopup.then(function(res) {
      if(res) {
        $timeout(function() {
          screen()
          .then(function(imageRes) {
            var path = 'file://' + imageRes.filePath;
            share(path);
          });
        }, 500);
      } else {
        return;
      }
    });
  };

});
