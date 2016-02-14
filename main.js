var app = angular.module('tophash', ['ui.router']);

// Some dummy states
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider.state({ name: 'home', url: '/', controller: function() { }, template: '<h3>Features</h3><li>backbutton</li><li> forwardbutton</li><li> deeplinking</li><li>bookmarking</li><li>history</h1><li>send link (to helpdesk) </li><h3>Missing</h3>hash namespaces, well known deeplinks</div>'});
  $stateProvider.state({ name: 'page', url: '/page', controller: function() { }, template: '<h3>Template 1</h3>Level 1<div  ui-view></div>level 1'});
  $stateProvider.state({ name: 'page.foo', url: '/foo', controller: function() { }, template: '<div style="border:1px solid green"><h3>Template 2</h3><b>Nested state</b> <a href="#/page/foo/12">12</a> <a ui-sref="page.foo.id({id:27})">27</a><div  ui-view></div></div>'});
  $stateProvider.state({ name: 'page.foo.id', url: '/:id', controller: function() { }, template: '<div style="border:1px solid blue"><h3>Template 3</h3><div style="font-size:50px">$state.params.id: {{$state.params.id}}</div>'});
});

// Adds state change hooks; 
app.run(function($rootScope, $state, $location, $urlRouter) {

	/*
	//here the magic url forwarder starts
	*/
	if(window!=top){
		//state change from inside app 
		$rootScope.$on('$locationChangeStart', function(evt) {
		      //prevent hash change in iframe
		      evt.preventDefault();

		      //write hash to top frame	
		      top.location.hash=$location.url();
		})

		//listen to top frame hashchange event
		top.onhashchange=function(data){
			$location.path(top.window.location.hash.substring(1));
			$urlRouter.sync();
		}

		//initialize for deep linking
		$location.path(top.window.location.hash.substring(1));
		$urlRouter.sync();
	}
	/*
	//here the magic url forwarder ends
	*/

	//used by state dropdown in example
	$rootScope.$state = $state;

}); 
