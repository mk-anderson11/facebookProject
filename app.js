//<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js"></script>
//<script src="//angular-ui.github.io/ui-router/release/angular-ui-router.js"></script>

angular.module('News', ['ui.router'])
  .factory('postFactory', [function(){
    var o = {
      posts: []
    };
    return o;
  }])

  .factory('userFactory', [function(){
    var name = 'Matt';

    var factory = {
      name: '',
      email: '',
      url: ''
    };
    //factory.getName = function() {
    //  return name;
    //}
    return factory;
  }])

  .config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
      .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostCtrl'
    })
	.state('login', {
	url: '/login',
	templateUrl: '/login.html',
	controller: 'LogInCtrl'
    })
;

    $urlRouterProvider.otherwise('login');
  }])

  .controller('LogInCtrl', [
    '$scope',
    'userFactory',
    function($scope, userFactory) {
      //alert(userFactory.getName());
      //$scope.userName = userFactory.name;
      //$scope.userEmail = userFactory.email;
      //$scope.userUrl = userFactory.url;

      $scope.LogIn = function() {
        userFactory.name = $scope.userName;
        userFactory.email = $scope.userEmail;
        userFactory.url = $scope.userUrl;

        //alert(userFactory.url);
        if(angular.isUndefined(userFactory.url))
        {
          userFactory.url = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
        }


        //alert(userFactory.name);
      }
    }
  ])


  .controller('PostCtrl', [
  '$scope',
  '$stateParams',
  'postFactory',
  'userFactory',
  function($scope, $stateParams, postFactory, userFactory){
    $scope.post = postFactory.posts[$stateParams.id];
    $scope.addComment = function(){
      if($scope.body === '') { return; }
      $scope.post.comments.push({
        body: $scope.body,
        upvotes: 0,
        user: userFactory.name,
        url: userFactory.url
      });
      $scope.body = '';
    };
    $scope.incrementUpvotes = function(comment){
      comment.upvotes += 1;
    };
  }])


  .controller('MainCtrl', [
  '$scope',
  'postFactory',
  'userFactory',
  function($scope, postFactory, userFactory){

  $scope.user = userFactory.name;

	$scope.posts = postFactory.posts;
    //$scope.test = 'Hello world!';
     /*$scope.posts = [
       {title:'Post 1', upvotes:5},
       {title:'Post 2', upvotes:6},
       {title:'Post 3', upvotes:1},
       {title:'Post 4', upvotes:4},
       {title:'Post 5', upvotes:3} ]
   */
      $scope.addPost = function() {
       $scope.posts.push({
         title: $scope.formContent,
         upvotes: 0,
         comments: [],
         user: userFactory.name,
         email: userFactory.email,
         avatarUrl: userFactory.url
       });
         $scope.title='';
        //$scope.formContent='';
      };

	$scope.LogIn = function(userName){
		var user = userName;
		alert(userName);
	}

	$scope.toLogIn = function() {
		alert(user);
	}

       $scope.incrementUpvotes = function(post) {
         post.upvotes += 1;
       };


     }
]);
