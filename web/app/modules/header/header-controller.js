(function () {

    angular.module('candidatePortal.application').controller('candidatePortal.modules.header.headerController', [
        '$scope',
        '$rootScope',
        '$state',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        function ($scope, $rootScope, $state, apiUrlConfig, apiMethods) {

        $scope.onLogoutClick = function(){
            var url = apiUrlConfig.logout;
            apiMethods.apiPOSTReq(url).then(function (response) {
                console.log(" logout service success !!!!!");
                $rootScope.loggedInStatus = false;
                $state.go("home");
            }, function(response){
                console.log("logout service failure !!!!!");
                console.log(response);
            });
        }

    }]);
})();