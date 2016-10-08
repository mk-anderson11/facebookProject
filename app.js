//<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js"></script> 
//<script src="//angular-ui.github.io/ui-router/release/angular-ui-router.js"></script>

angular.module('News', ['ui.router']) 
  .factory('postFactory', [function(){
    var o = {
      posts: []
    };
    return o;
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
	//controller: 'MainCtrl;
    })
;
 
    $urlRouterProvider.otherwise('home'); 
  }])
  

  .controller('PostCtrl', [
  '$scope',
  '$stateParams',
  'postFactory',
  function($scope, $stateParams, postFactory){
    $scope.post = postFactory.posts[$stateParams.id];
    $scope.addComment = function(){
      if($scope.body === '') { return; } 
      $scope.post.comments.push({
        body: $scope.body,
        upvotes: 0 
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
  function($scope, postFactory){
    $scope.posts = postFactory.posts;
    $scope.test = 'Hello world!'; 
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
         comments: []
       });
         $scope.title='';
        //$scope.formContent='';
      };

	$scope.toLogIn = function() {
	
	}
    
       $scope.incrementUpvotes = function(post) {
         post.upvotes += 1; 
       };
    
   
     } 
]);




