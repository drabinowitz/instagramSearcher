angular.module('instagramSearcher',[]).
	
	controller('instaSearchCtrl',function($scope,$timeout,$q,$http){

		$scope.submitted = false;

		function wait() {

			var defer = $q.defer();

			$timeout(function() {

				defer.resolve();

			}, 2000);

			return defer.promise;

		};

		$scope.instagramSearch = function(keyword){

			$scope.submitted = true;

			if($scope.instaForm.$valid){

				wait().then(function(){

					$scope.submitted = false;

				})

			} else {

				wait().then(function(){

					$scope.submitted = false;

				});

			}

		};

	});