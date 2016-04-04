(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.my-applications.myApplicationsController',[
        '$scope',
        '$rootScope',
        '$state',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        'candidatePortal.services.localStorageService',
        'candidatePortal.models.positionModel',
        function ($scope, $rootScope, $state, apiUrlConfig, apiMethods, commonService, navigationService, localStorageService, positionModel) {
            $scope.goToPositionList = function () {
                navigationService.goToOpenPositionsList();
            };

            $scope.onSignUpClick = function () {
                var callback = function () {
                    navigationService.goToMyApplications();
                };
                navigationService.goToSignUpView(callback);
            };

            $scope.onSignInClick = function () {
                var callback = function () {
                    navigationService.goToMyApplications();
                };
                navigationService.goToLoginView(callback);
            };

            var getApplicationsList = function () {
                var url = apiUrlConfig.profileStatus;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.applicationsList = positionModel.digestPositionApiObj(response.data.response);
                    console.log($scope.applicationsList);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };

            if($rootScope.loggedInStatus)
                getApplicationsList();
        }
    ]);
})();