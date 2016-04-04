(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.forgot-password.forgotPasswordController',[
        '$scope',
        '$state',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        'candidatePortal.services.localStorageService',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService, navigationService, localStorageService) {

            $scope.onGetPasswordClick = function () {
                if($scope.forgotPasswordForm.$invalid){
                    if($scope.forgotPasswordForm.$error.required != null){
                        $scope.forgotPasswordForm.$error.required.forEach(function(element){
                            element.$setDirty();
                        });
                    }
                    return;
                }
                var url = apiUrlConfig.forgotPassword;
                var req = {
                    email : $scope.forgotPasswordObj.email
                };
                apiMethods.apiGETReq(url, req).then(function (response) {
                    commonService.showSuccessMsg("Password has been sent on your email id");
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };

            $scope.onBackButtonClick = function () {
                navigationService.goToLoginView();
            }
        }
    ]);
})();