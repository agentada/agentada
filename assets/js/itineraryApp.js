angular.module('itineraryApp', [])

.controller('ItineraryController', ['$scope', '$http', function($scope, $http) {
    $scope.itineraries = [];
    $scope.events = [];
    $scope.currentItinerary;

    $scope.getCurrentUser = function() {
        $http.get('user/current').success( function(data, status, headers, config) {
            $scope.userid = data.id;
        });
    };

    $scope.getItineraries = function() {
        
        $http.get('/itinerary').success( function(data, status, headers, config) {
            $scope.itineraries = data;
            if(data.length > 0) {
                $scope.currentItinerary = data[0];
            }
            else {
                $scope.currentItinerary = {'title': 'Itinerary', 'id': 0};
            }
            $scope.getEvents();
        });
    };

    $scope.getEvents = function() {
        console.log($scope.currentItinerary.id);
        $http.post('/itinerary/events', {id: $scope.currentItinerary.id+""}).success( function(data, status, headers, config) {
            $scope.itineraries = data;
            if(data.length > 0) {
                $scope.events = data;
            }
            else {
                $scope.events = {'title': 'Blah', 'id': 0};
            }
        });
    }

    $scope.newCurrentItinerary = function(iID) {
        for(i in $scope.itineraries)
        {
            if(i.id == iID)
            {
                $scope.currentItinerary = i;
                return;
            }
        }
        $scope.currentItinerary = {'title': 'Itinerary'};
    }

    $scope.init = function() {
        console.log("init");
        $scope.getItineraries();
    };

    //$scope.init();
}]);