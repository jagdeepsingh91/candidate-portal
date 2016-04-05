(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.signUp.signUpController', [
        '$scope',
        '$rootScope',
        '$window',
        '$state',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.models.userModel',
        'candidatePortal.services.navigationService',
        'candidatePortal.services.localStorageService',
        function ($scope, $rootScope, $window, $state, apiUrlConfig, apiMethods, commonService, userModel, navigationService, localStorageService) {

            var callback = $state.params.callback;

            $scope.signUpClick = function () {
                if($scope.signUpForm.$invalid){
                    if($scope.signUpForm.$error.required != null){
                        $scope.signUpForm.$error.required.forEach(function(element){
                            element.$setDirty();
                        });
                    }
                    return;
                }

                var url = apiUrlConfig.createUser;
                var req = userModel.createUserApiObj($scope.signUpObj);
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    commonService.showSuccessMsg("User Account created successfully");
                    var userObj = userModel.digestUserApiObj(response.data.response);
                    localStorageService.saveUserDetails(userObj);
                    //if(!$rootScope.loggedInStatus)
                    //    navigationService.goToLoginView();
                    //else if(callback)
                    //    callback();
                    //else
                    navigationService.goToOpenPositionsList();
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            
            $scope.onBackButtonClick = function () {
                if(callback)
                    callback();
                else
                    navigationService.goToOpenPositionsList();
            }
        }
    ]);
})();