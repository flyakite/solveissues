angular.module('starter.controllers', [])

.controller('IssuesController', function($scope, IssueService) {
  $scope.issues = [];
  IssueService.all().then(function(issues) {
    console.dir(issues);
    $scope.issues = issues;
  }, function(err) {
    console.dir(err);
  })
})
.controller('IssueController', function($scope, $stateParams, $ionicHistory, IssueService) {
  // $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
  //   $ionicHistory.clearHistory();
  // });
  $scope.issue = {};
  $scope.issueVoted = false;
  IssueService.get($stateParams.issueId).then(function(issue) {
    $scope.issue = issue;
  }, function(err) {
    console.dir(err);
  });
  $scope.voteUp = function($event, issueId) {
    $scope.issueVoted = true;
    $scope.issue.vote_count += 1;
    console.log('vote ' + issueId);
    $event.preventDefault();
    return false;
  };
})
.controller('CreateIssueController', function($scope, $state, $ionicLoading, IssueService) {
  $scope.issue = {};
  $scope.saveIssue = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });

    IssueService.create($scope.issue).then(function(result) {
      $ionicLoading.hide();
      $state.go('tab.issues');
    }, function(err) {
      $ionicLoading.hide();
      console.dir(err);
      $scope.message = err.message || '建立失敗';
    });
  }
})
.controller('RepresentitivesController', function($scope, UserService) {
  console.log('RepresentitivesController');
  $scope.reps = [];
  UserService.myRepresentitives().then(function(reps) {
    console.log('reps');
    console.dir(reps);
    $scope.reps = reps;
  }, function(err) {
    console.dir(err);
  });
})

.controller('RepresentitiveController', function($scope, $stateParams, $ionicHistory, UserService) {
  // $ionicHistory.nextViewOptions({
  //     historyRoot: true
  // });
  // viewHistory = $ionicHistory.viewHistory()
  // console.log('viewHistory');
  // console.dir(viewHistory);
  // var history = viewHistory.histories[viewHistory.currentView.historyId];
  // console.dir(history);
  // if(history.stack.length === 1){
  //   console.dir(history.stack.pop());
  // }
    // $ionicHistory.clearCache();
  // $scope.$on('$ionicView.afterLeave', function(event, viewData) {
  //   $ionicHistory.clearHistory();
  // });
  UserService.get($stateParams.userId).then(function(user) {
    user.more_issues = user.more_issues || [];
    angular.forEach(user.voted_issues, function(v, k) {
      if(user.same_issues.indexOf(v) == -1){
        user.more_issues.push(v);
      }
    }) 
    $scope.user = user;

  }, function(err) {
    console.dir(err);
  })
  // var user = UserService.get($stateParams.userId);
  // console.dir(user);
})


.controller('UserController', function($scope, UserService) {
  $scope.user = {};
  UserService.me().then(function(user) {
    $scope.user = user;

  },function(err) {
    console.dir(err);
  })
})
.controller('LoginController', function($scope, $state, UserService, Config) {
  $scope.userCreds = {
    email: 'jonas@beierpredovic.org',
    password: 12345678
  };
  $scope.login = function() {
    UserService.login($scope.userCreds).then(function() {
      $state.go('tab.issues');
    }, function(err) {
      $scope.message = err.message || 'Login Failed';
    });
  };
   
})
;
