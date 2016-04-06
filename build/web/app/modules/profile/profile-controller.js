!function(){angular.module("candidatePortal.application").controller("candidatePortal.modules.profile.profileController",["$scope","$rootScope","$state","candidatePortal.services.apiUrlConfig","candidatePortal.services.apiMethods","candidatePortal.services.commonService","candidatePortal.services.navigationService","candidatePortal.services.localStorageService","candidatePortal.models.applicantModel",function(e,o,i,n,t,a,l,r,c){e.profileObj={};var p=function(){var o=n.getApplicantProfile;t.apiGETReq(o).then(function(o){e.profileObj.applicantDetailObj=c.digestApplicantApiObj(o.data.response)},function(e){a.onApiResponseError(e)})};o.loggedInStatus&&p();var s=function(){var o=n.getAttachments;t.apiGETReq(o).then(function(o){e.profileObj.attachmentsObj=c.digestApplicantAttachmentsApiObj(o.data.response)},function(e){a.onApiResponseError(e)})};o.loggedInStatus&&s(),e.onViewFullProfile=function(){jQuery.noConflict(),jQuery(document).ready(function(e){e(".view-profile-container").slideToggle(),e(".view-profile-btn span").toggleClass("icon-chevron-thin-up")})},e.onSignUpClick=function(){var e=function(){l.goToUserProfile()};l.goToSignUpView(e)},e.onSignInClick=function(){var e=function(){l.goToUserProfile()};l.goToLoginView(e)},e.onUpdateResumeClick=function(){if(console.log(e.profileObj.updateResumeObj),!e.profileObj.updateResumeObj)return void a.showInfoMsg("Please select Resume to upload");var o=n.resumeUpload,i=new FormData;i.append("file",e.profileObj.updateResumeObj[0]),t.apiUploadFileReq(o,i).then(function(e){u(e.data.response)},function(e){a.onApiResponseError(e)})};var u=function(o){var i=n.createApplicantProfile,l=c.convertUIObj2ApiObj(e.profileObj.applicantDetailObj);l.applicantOriginalResumePath=o.applicantOriginalResumePath,l.applicantOriginalDocPath=o.applicantOriginalDocPath,t.apiPOSTReq(i,l).then(function(e){p(),a.showSuccessMsg("Resume Updated successfully")},function(e){a.onApiResponseError(e)})};e.onEditProfileClick=function(){l.goToUpdateProfile()},e.onAddDocumentsClick=function(){if(!e.profileObj.attachFileObj)return void a.showInfoMsg("Please select file to upload");var o=n.uploadAttachments,i=new FormData;i.append("file",e.profileObj.attachFileObj[0]),t.apiUploadFileReq(o,i).then(function(e){s(),a.showSuccessMsg("File uploaded successfully")},function(e){a.onApiResponseError(e)})}}])}();