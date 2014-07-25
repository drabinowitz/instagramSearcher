angular.module('myApp',[]).
	
	controller('myCtrl',function($scope,$timeout,$q,$http){

		function wait() {

			var defer = $q.defer();

			$timeout(function() {

				defer.resolve();

			}, 2000);

			return defer.promise;

		};

		function notify(){

			$scope.notifySaved = true;

			wait().then(function(){

				$scope.notifySaved = false;

			});

		}

	    $scope.saveSettings = function() {

	    	$http.put('api/update_password', $scope.data).

    		success(function(){

        		notify();

        	}).

        	error(function() {

        		$scope.error = true;

        		wait().then(function(){

        			$scope.error = false;

        		});

        	});
    
	    };

	});