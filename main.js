var app = angular.module('tophash', ['ui.router']);

// Empty config block.  Define your example states here.
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider.state({ name: 'xx', url: '/', controller: function() { }, template: '<h1>xx</h1><div ui-view></div>'});
  $stateProvider.state({ name: 'home', url: '/home', controller: function() { }, template: '<h1>Home</h1><div ui-view></div>'});
  $stateProvider.state({ name: 'home.foo', url: '/foo', controller: function() { }, template: '<h1>foo</h1><b>Nested state</b>'});
});

// Adds state change hooks; 
app.run(function($rootScope, $state, $location, $urlRouter) {

	/*
	//here the magic url forwarder starts
	*/
	if(window!=top){
		//write hash to top frame url
		$rootScope.$on('$locationChangeStart', function(evt) {
		      evt.preventDefault();
		      top.location.hash=$location.url();
		})

		//listen to top frame hash change
		top.onhashchange=function(data){
			$location.path(top.window.location.hash.substring(1));
			$urlRouter.sync();
		}
	}
	/*
	//here the magic url forwarder ends
	*/

	$rootScope.$state = $state;

}); 
