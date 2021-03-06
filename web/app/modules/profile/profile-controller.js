(function () {

    angular.module('candidatePortal.application').controller('candidatePortal.modules.profile.profileController', [
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

            $scope.profileObj = {};

            var getProfileObj = function () {
                var url = apiUrlConfig.getApplicantProfile;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.profileObj.applicantDetailObj = applicantModel.digestApplicantDynamicApiObj(response.data.response);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            if($rootScope.loggedInStatus)
                getProfileObj();

            var getApplicantAttachments = function () {
                var url = apiUrlConfig.getAttachments;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.profileObj.attachmentsObj = applicantModel.digestApplicantAttachmentsApiObj(response.data.response);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            if($rootScope.loggedInStatus)
                getApplicantAttachments();

            $scope.onViewFullProfile = function () {
                jQuery.noConflict();
                jQuery(document).ready(function($) {
                    $('.view-profile-container').slideToggle();
                    $('.view-profile-btn span').toggleClass('icon-chevron-thin-up');
                });
            };

            $scope.onSignUpClick = function () {
                var callback = function () {
                    navigationService.goToUserProfile();
                };
                navigationService.goToSignUpView(callback);
            };

            $scope.onSignInClick = function () {
                var callback = function () {
                    navigationService.goToUserProfile();
                };
                navigationService.goToLoginView(callback);
            };

            $scope.onUpdateResumeClick = function () {
                console.log($scope.profileObj.updateResumeObj);
                if(!$scope.profileObj.updateResumeObj){
                    commonService.showInfoMsg("Please select Resume to upload");
                    return;
                }

                var url = apiUrlConfig.resumeUpload;
                var fd = new FormData();
                fd.append('file', $scope.profileObj.updateResumeObj[0]);
                apiMethods.apiUploadFileReq(url, fd).then(function (response) {
                    console.log($scope.profileObj.applicantDetailObj.applicantId);
                    if($scope.profileObj.applicantDetailObj.applicantId)
                        createApplicantForUpdateResume(response.data.response);
                    else
                        navigationService.goToUpdateProfile(response.data.response);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };

            var createApplicantForUpdateResume = function (response) {
                var url = apiUrlConfig.createApplicantProfile;
                var req = response;
                //req.applicantOriginalResumePath = response.applicantOriginalResumePath;
                //req.applicantOriginalDocPath = response.applicantOriginalDocPath;
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    getProfileObj();
                    commonService.showSuccessMsg("Resume Updated successfully");
                    $scope.profileObj.updateResumeObj = null;
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };

            $scope.onEditProfileClick = function () {
                navigationService.goToUpdateProfile();
            };

            $scope.downloadFile = function (filePath) {
                var url = apiUrlConfig.downloadFile+"?filePath="+filePath;
                window.open(url, "_blank");
                //var req = {
                //    filePath : filePath
                //};
                //apiMethods.apiGETReq(url, req);
            };

            $scope.onAddDocumentsClick = function () {
                if(!$scope.profileObj.attachFileObj){
                    commonService.showInfoMsg("Please select file to upload");
                    return;
                }

                var url = apiUrlConfig.uploadAttachments;
                var fd = new FormData();
                fd.append('file', $scope.profileObj.attachFileObj[0]);
                apiMethods.apiUploadFileReq(url, fd).then(function (response) {
                    getApplicantAttachments();
                    $scope.profileObj.attachFileObj = undefined;
                    commonService.showSuccessMsg("File uploaded successfully");
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
        }
    ]);
})();