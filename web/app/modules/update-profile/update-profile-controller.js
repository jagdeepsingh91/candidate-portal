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
        function ($scope, $rootScope, $state, apiUrlConfig, apiMethods, commonService, navigationService, localStorageService, applicantModel) {

            //$scope.formObj = {};

            var getProfileObj = function () {
                var url = apiUrlConfig.getApplicantProfile;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.updateProfileObj= applicantModel.digestApplicantApiObj(response.data.response);
                    if($scope.updateProfileObj.applicantCity){
                        getLocationId($scope.updateProfileObj.applicantCity);
                    }
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            if($rootScope.loggedInStatus)
                getProfileObj();

            var getLocationId = function (city) {
                var url = apiUrlConfig.getMastersId("location", city);
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.updateProfileObj.applicantCity = {
                        id : response.data.response,
                        name : city
                    };
                }, function (response) {
                    console.log("Error in geeting location id");
                });
            };

            $scope.onCancelUpdateClick = function () {
                navigationService.goToUserProfile();
            };

            $scope.onUpdateApplicantClick = function () {
                if(!$scope.formObj()){
                    commonService.showInfoMsg("Form is incomplete");
                    return;
                }
                var url = apiUrlConfig.createApplicantProfile;
                var req = applicantModel.convertUIObj2ApiObj($scope.updateProfileObj);
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    commonService.showSuccessMsg("Profile Updated successfully");
                    navigationService.goToUserProfile();
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
        }
    ]);
})();