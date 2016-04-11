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
                $scope.showTermsAndConditionView = true;
            };

            $scope.onTermsAccepted = function () {
                var url = apiUrlConfig.createUser;
                var req = userModel.createUserApiObj($scope.signUpObj);
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    commonService.showSuccessMsg("User Account created successfully");
                    var userObj = userModel.digestUserApiObj(response.data.response);
                    localStorageService.saveUserDetails(userObj);
                    $scope.showTermsAndConditionView = false;
                    //if(!$rootScope.loggedInStatus)
                    //    navigationService.goToLoginView();
                    //else if(callback)
                    //    callback();
                    //else
                    navigationService.goToOpenPositionsList();
                }, function (response) {
                    $scope.showTermsAndConditionView = false;
                    commonService.onApiResponseError(response);
                });
            };

            $scope.onTermsRejected = function () {
                $scope.showTermsAndConditionView = false;
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