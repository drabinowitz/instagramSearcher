angular.module('instagramSearcher',['ngAnimate']).
	
	controller('instaSearchCtrl',function($rootScope,$scope,$timeout,$q,$http){

		$scope.submitted = false;

		$scope.gotResults = false;

		$scope.error = false;

		function wait() {

			var defer = $q.defer();

			$timeout(function() {

				defer.resolve();

			}, 2000);

			return defer.promise;

		};

		function notify(onThis) {

			wait().

			then(function(){

				$scope[onThis] = false;

			});

		};

		$scope.instagramSearch = function(keyword){

			$scope.submitted = true;

			if($scope.instaForm.$valid){

				var url = "https://api.instagram.com/v1/tags/" + keyword + "/media/recent";

				var request = {

					callback: 'JSON_CALLBACK',

					client_id: 'ba2df9d0085a4c5980f0a9c1d24b7d29'

				};

				$http({

					method: 'JSONP',

					url:url,

					params:request

				}).

				success(function(results){

					$scope.submitted = false;

					$rootScope.$broadcast('instaResultsReturned',keyword,results);

					console.log(results);

				}).

				error(function(){

					$scope.submitted = false;

					notify('error');

				});

			} else {

				notify('submitted');

			}

		};

	})

	.controller('instaResultsCtrl',function($scope,$q){

		$scope.results = [];

		$scope.keyword = undefined;

		$scope.$on('instaResultsReturned',function(event,keyword,results){

			console.log('confirmed');

			$scope.keyword = keyword;

			$scope.results = results.data;

		})

	});