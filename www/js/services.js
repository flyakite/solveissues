angular.module('starter.services', [])

.factory('DataStore', function($q, $http, Config) {
  function parseParams (params) {
    var headers = {
      //'Content-Type':'application/json'
    };
    var data = {
      'authentication_token': Config.accessToken
    }
    params = params || {};
    params.headers = params.headers || {};
    params.headers = angular.extend(headers, params.headers);
    params.data = angular.extend(data, params.data);
    return params;
  }


  var URL = Config.API_URL + '/';

  var service = {
    all: function(classname, params) {
      var d = $q.defer();
      $http.get(URL + classname, parseParams({params:params})).then(function(result) {
        // console.dir(result.data.data);
        d.resolve(result.data.data);
      },function(err) {
        d.reject(err);
      });
      return d.promise;
    },
    get: function(classname, id, params) {
      var d = $q.defer();
      $http.get(URL + classname + '/' + id, parseParams({params:params})).then(function(result) {
        d.resolve(result.data);
      },function(err) {
        d.reject(err);
      });
      return d.promise;
    }
  }
  return service;
})
.service('IssueService', function($q, $http, DataStore, Config) {

  // var reps = [
  //   {
  //     id: 0,
  //     name: '王金瓶',
  //     picture: 'img/wang.jpg',
  //     voted_issues: [0, 1, 2, 3],
  //     same_issue_count: 2
  //   },
  //   {
  //     id: 1,
  //     name: '賴親得',
  //     picture: 'img/lie.jpg',
  //     voted_issues: [0, 3],
  //     same_issue_count: 1
  //   }
  // ]
  // var issues = [
  //   {
  //     id: 0,
  //     title: '支持波卡',
  //     description: '支持波卡內文詳細',
  //     vote_count: 2032,
  //     reps:[reps[0],reps[1]]
  //   },{
  //     id: 1,
  //     title: '支持非常長長長長長長長長的標題',
  //     description: '支持非常長長長長長長長長的標題詳細',
  //     vote_count: 20,
  //     reps:[reps[0]]
  //   },{
  //     id: 2,
  //     title: '支持核廢料放總統府',
  //     description: '支持核廢料放總統府詳細',
  //     vote_count: 2,
  //     reps:[reps[0]]
  //   },{
  //     id: 3,
  //     title: '支持廣電三法',
  //     description: '支持廣電三法詳細',
  //     vote_count: 203,
  //     reps:[reps[0],reps[1]]
  //   }
  // ];


  var service = {
    all: function() {
      return DataStore.all('issues');
      // return issues;
    },
    get: function(id) {
      return DataStore.get('issue', id);
      // return issues[id];
    },
    my: function() {
      return [issues[0], issues[1]];
    },
    create: function(issue) {
      return DataStore.create('issue', {'data': issue});
    }
  };
  return service;
})
.service('UserService', function($q, $http, DataStore, Config) {
  // var issues = [
  //   {
  //     id: 0,
  //     title: '支持波卡',
  //     description: '支持波卡內文詳細',
  //     vote_count: 2032,
  //   },{
  //     id: 1,
  //     title: '支持非常長長長長長長長長的標題',
  //     description: '支持非常長長長長長長長長的標題詳細',
  //     vote_count: 20,
  //   },{
  //     id: 2,
  //     title: '支持核廢料放總統府',
  //     description: '支持核廢料放總統府詳細',
  //     vote_count: 2,
  //   },{
  //     id: 3,
  //     title: '支持廣電三法', 
  //     description: '支支持廣電三法持波卡詳細',
  //     vote_count: 203,
  //   }
  // ];

  // var users = [
  //   {
  //     id: 0,
  //     name: '王金瓶',
  //     picture: 'img/wang.jpg',
  //     voted_issues: issues,
  //     same_issues: [issues[0]],
  //     same_issue_count: 2
  //   },
  //   {
  //     id: 1,
  //     name: '賴親得',
  //     picture: 'img/lie.jpg',
  //     voted_issues: [issues[0], issues[3]],
  //     same_issues: [issues[0]],
  //     same_issue_count: 1
  //   },
  //   {
  //     id: 2,
  //     name: '王大明',
  //     voted_issues: [issues[0], issues[3]]
  //   }
  // ];

  var _currentUser = undefined;  
  var service = {
    all: function() {
      return users;
    },
    get: function(id) {
      return users[id];
    },
    me: function() {
      return serice.currentUser();
    },
    myRepresentitives: function() {
      return [users[0], users[1]];
    },
    login: function() {
      var d=$q.defer();
      $http.post(Config.API_URL + '/login').then(function(result) {
        console.dir(result);
        _currentUser = result.user;
        d.resolve(result);
      }, function(err) {
        console.dir(err);
        d.reject(err);
      });
      return d.promise;
    },
    logout: function() {
      var d=$q.defer();
      $http.post(Config.API_URL + '/logout').then(function(result) {
        console.dir(result);
        _currentUser = undefined;
        d.resolve(result);
      }, function(err) {
        console.dir(err);
        d.reject(err);
      });
      return d.promise;
    },
    currentUser: function() {
      if(_currentUser){
        return $q.when(_currentUser);
      }else{
        return $q.reject({error: 'noUser'});
      }
    }
  };
  return service;
})
;
