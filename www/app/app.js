angular.module('app', [
  'ionic'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
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
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

})

.controller('homeCtrl', function() {
  console.log('home');

});