(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.change-password.changePasswordController', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        'candidatePortal.services.localStorageService',
        function ($scope, $rootScope, $state, $stateParams, apiUrlConfig, apiMethods, commonService, navigationService, localStorageService) {

            var uuid = $stateParams.uuid;
            var userId;
            if(uuid){
                var url = apiUrlConfig.validatePasswordUUID(uuid);
                apiMethods.apiGETReq(url).then(function (response) {
                    userId = response.data.response;
                }, function (response) {
                    commonService.onApiResponseError(response);
                    navigationService.goToLoginView();
                });
            }

            $scope.onChangePasswordClick = function(){

                if($scope.changePasswordForm.$invalid){
                    if($scope.changePasswordForm.$error.required != null){
                        $scope.changePasswordForm.$error.required.forEach(function(element){
                            element.$setDirty();
                        });
                    }
                    return;
                }

                var url = apiUrlConfig.changePassword;
                var reqObj = {
                    password : $scope.changePasswordObj.password,
                    userId : userId
                };
                apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                    console.log("service success !!!!!");
                    commonService.showSuccessMsg("Password updated successfully");
                    if(userId)
                        navigationService.goToOpenPositionsList();
                    else
                        navigationService.goToUserProfile();
                }, function(response){
                    commonService.onApiResponseError(response);
                });
            };

            $scope.onBackButtonClick = function () {
                navigationService.goToUserProfile();
            };
        }
    ]);
})();