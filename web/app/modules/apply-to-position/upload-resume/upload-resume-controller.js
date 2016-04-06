(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.apply-to-position.upload-resume.uploadResumeController',[
        '$scope',
        '$state',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        'candidatePortal.models.applicantModel',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService, navigationService, applicantModel) {

            $scope.uploadUrl = apiUrlConfig.resumeUpload;

            $scope.onUploadResumeNext = function () {
                console.log($scope.applyToPositionObj.selectedFiles);
                if(!$scope.applyToPositionObj.selectedFiles){
                    commonService.showInfoMsg("Please upload your resume");
                }
                else if($scope.applyToPositionObj.selectedFiles[0].progress == "Success"){
                    if(!$scope.applyToPositionObj.userDetailObj) {
                        var res = $scope.applyToPositionObj.selectedFiles[0].response.response;
                        $scope.applyToPositionObj.userDetailObj = applicantModel.digestApplicantApiObj(res);
                    }
                    navigationService.goToApplicationForm();
                }
                else if($scope.applyToPositionObj.selectedFiles[0].progress == "Failed"){
                    commonService.showInfoMsg("Uploading resume failed. Please try again.");
                }
                else{
                    commonService.showInfoMsg("Please wait for resume to upload");
                }
            };
            
            $scope.onRemoveSelectedFileClick = function () {
                $scope.applyToPositionObj.selectedFiles = undefined;
            };

            $scope.onUploadResumeBack = function () {
                //if($scope.callbackFn)
                //    $scope.callbackFn();
                //else
                //    navigationService.goToOpenPositionsList();

                window.history.back();
            };
        }
    ]);
})();