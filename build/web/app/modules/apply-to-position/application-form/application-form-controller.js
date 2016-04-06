(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.apply-to-position.application-form.applicationFormController',[
        '$scope',
        '$state',
        '$stateParams',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        'candidatePortal.models.applicantModel',
        function ($scope, $state, $stateParams, apiUrlConfig, apiMethods, commonService, navigationService, applicantModel) {

            var positionId = $stateParams.id;
            $scope.onApplicationFormSubmit = function () {
                if(!$scope.formObj()){
                    commonService.showInfoMsg("Form is incomplete");
                    return;
                }

                var url = apiUrlConfig.createApplicantProfile;
                $scope.applyToPositionObj.userDetailObj.applicantPositionId = positionId;
                var req = applicantModel.convertUIObj2ApiObj($scope.applyToPositionObj.userDetailObj);
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    commonService.showSuccessMsg("Applied to position");
                    console.log(response);
                    navigationService.goToOpenPositionsList();
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };

            $scope.onApplicationFormBack = function () {
                navigationService.goToUploadResume();
            };

        }
    ]);
})();