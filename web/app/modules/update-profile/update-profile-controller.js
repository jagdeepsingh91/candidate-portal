(function () {

    angular.module('candidatePortal.application').controller('candidatePortal.modules.update-profile.updateProfileController', [
        '$scope',
        '$rootScope',
        '$state',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        'candidatePortal.services.localStorageService',
        'candidatePortal.models.applicantModel',
        'candidatePortal.models.dynamicFieldsModel',
        function ($scope, $rootScope, $state, apiUrlConfig, apiMethods, commonService, navigationService, localStorageService, applicantModel, dynamicFieldsModel) {

            //$scope.formObj = {};
            var userObj = $state.params.userObj;
            console.log(userObj);
            var getProfileObj = function () {
                var url = apiUrlConfig.getApplicantProfile;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.updateProfileObj= applicantModel.digestApplicantDynamicApiObj(response.data.response);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };

            if($rootScope.loggedInStatus && userObj == null)
                getProfileObj();
            else if(userObj){
                $scope.updateProfileObj= applicantModel.digestApplicantDynamicApiObj(userObj);
            }

            $scope.onCancelUpdateClick = function () {
                navigationService.goToUserProfile();
            };

            $scope.onSuccessCallback = function () {
                commonService.showSuccessMsg("Profile Updated successfully");
                navigationService.goToUserProfile();
            };
        }
    ]);
})();