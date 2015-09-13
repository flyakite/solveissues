// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.value('Config', {
  API_URL: 'https://stark-badlands-3288.herokuapp.com/api/v1',
  authentication_token: ''
})
.run(function($ionicPlatform, $rootScope, $state) {
  $rootScope.$on('$stateChangeError',
  function(event, toState, toParams, fromState, fromParams, err) {
    // debugger;
    console.log('$stateChangeError ' + err && (err.debug || err.message || err));

    //if the error is noUser, go to login state
    if ( err && err.error === 'noUser'){
      console.log('noUser @$stateChangeError');
      event.preventDefault();
      $state.go('login', {});
    }
    if( err ){
      console.log('err!!!!!');
      console.dir(err);
    }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.issues', {
    url: '/issues',
    views: {
      'tab-issues': {
        templateUrl: 'templates/tab-issues.html',
        controller: 'IssuesController'
      }
    }
  })
  .state('tab.issue', {
    url: '/issue/:issueId',
    views: {
      'tab-issues': {
        templateUrl: 'templates/tab-issue.html',
        controller: 'IssueController'
     }
    }
  })
  .state('tab.create-issue', {
    url: '/create-issue',
    views: {
      'tab-issues': {
        templateUrl: 'templates/tab-create-issue.html',
        controller: 'CreateIssueController'
     }
    },
    resolve: {
      currentUser: function(UserService) {
        return UserService.currentUser();
      }
    }
  })
  .state('tab.representitive', {
    url: '/representitive/:userId',
    views: {
      'tab-issues': {
        templateUrl: 'templates/tab-representitive.html',
        controller: 'RepresentitiveController'
      }
    }
  })

  .state('tab.representitives', {
    url: '/representitives',
    views: {
      'tab-representitives': {
        templateUrl: 'templates/tab-representitives.html',
        controller: 'RepresentitivesController'
      }
    },
    resolve: {
      currentUser: function(UserService) {
        return UserService.currentUser();
      }
    }
  })

  
  // .state('tab.representitive', {
  //   url: '/representitive/:userId',
  //   views: {
  //     'tab-representitives': {
  //       templateUrl: 'templates/tab-representitive.html',
  //       controller: 'RepresentitiveController'
  //     }
  //   }
  // })

  .state('tab.user', {
    url: '/user',
    views: {
      'tab-user': {
        templateUrl: 'templates/tab-user.html',
        controller: 'UserController'
      }
    },
    resolve: {
      currentUser: function(UserService) {
        return UserService.currentUser();
      }
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/issues');

});
