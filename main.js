var app = angular.module('tophash', ['ui.router']);

// Some dummy states
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider.state({ name: 'home', url: '/', controller: function() { }, template: '<h3>Features</h3><li>backbutton</li><li> forwardbutton</li><li> deeplinking</li><li>bookmarking</li><li>history</h1><li>send link (to helpdesk) </li><h3>Missing</h3>hash namespaces, well known deeplinks</div>'});
  $stateProvider.state({ name: 'page', url: '/page', controller: function() { }, template: '<div style="border:1px solid lime;padding:8px"><h3>Template 1</h3>Have you seen the hash in the url field of your browser?<div  ui-view></div><a ui-sref="page.foo">/page/foo</a> <a ui-sref="page">/page</a></div>'});
  $stateProvider.state({ name: 'page.foo', url: '/foo', controller: function() { }, template: '<div style="border:1px solid green;padding:8px"><h3>Template 2</h3><b>Nested state</b> <a href="#/page/foo/12">12</a> <a ui-sref="page.foo.id({id:27})">27</a><div  ui-view></div></div>'});
  $stateProvider.state({ name: 'page.foo.id', url: '/:id', controller: function() { }, template: '<div style="border:1px solid blue"><h3>Template 3</h3><div style="font-size:20px">$state.params.id: {{$state.params.id}}</div>'});
});

// Adds state change hooks; 
app.run(function($rootScope, $state, $location, $urlRouter) {

	/*
	//here the magic url forwarder starts
	//todo: pack into module, hash namespaces to enable more than one app in window, find place to live and be maintained
	*/
	if(window!=top){
		//state change from inside app 
		$rootScope.$on('$locationChangeStart', function(evt) {

		      //prevent hashchange in iframe
		      evt.preventDefault();

		      //write hash to top frame	
		      top.location.hash=$location.url();
		})

		//listen to top frame for hashchange event
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
