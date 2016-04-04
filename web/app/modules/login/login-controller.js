(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.login.loginController',[
        '$scope',
        '$state',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.models.userModel',
        'candidatePortal.services.navigationService',
        'candidatePortal.services.localStorageService',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService, userModel, navigationService, localStorageService) {

            var callback = $state.params.callback;

            $scope.loginObj = {};

            $scope.onLoginClick = function () {
                if($scope.loginForm.$invalid){
                    if($scope.loginForm.$error.required != null){
                        $scope.loginForm.$error.required.forEach(function(element){
                            element.$setDirty();
                        });
                    }
                    return;
                }
                var url = apiUrlConfig.userLogin;
                var req = userModel.createUserApiObj($scope.loginObj);
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    //commonService.showSuccessMsg("Logged in successfully");
                    var userObj = userModel.digestUserApiObj(response.data.response);
                    localStorageService.saveUserDetails(userObj);
                    if(callback)
                        callback();
                    else
                        navigationService.goToOpenPositionsList();
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };

            $scope.onSignUpLinkClick = function () {
                var callback = function () {
                    navigationService.goToLoginView()
                };
                navigationService.goToSignUpView(callback);
            };

            $scope.onForgotPasswordClick = function () {
                navigationService.goToForgotPassword();
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