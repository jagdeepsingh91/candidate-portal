!function(){angular.module("candidatePortal.application").controller("candidatePortal.modules.update-profile.updateProfileController",["$scope","$rootScope","$state","candidatePortal.services.apiUrlConfig","candidatePortal.services.apiMethods","candidatePortal.services.commonService","candidatePortal.services.navigationService","candidatePortal.services.localStorageService","candidatePortal.models.applicantModel",function(e,o,i,a,t,n,r,c,l){var s=function(){var o=a.getApplicantProfile;t.apiGETReq(o).then(function(o){e.updateProfileObj=l.digestApplicantApiObj(o.data.response)},function(e){n.onApiResponseError(e)})};o.loggedInStatus&&s(),e.onCancelUpdateClick=function(){r.goToUserProfile()},e.onUpdateApplicantClick=function(){if(!e.formObj())return void n.showInfoMsg("Form is incomplete");var o=a.createApplicantProfile,i=l.convertUIObj2ApiObj(e.updateProfileObj);t.apiPOSTReq(o,i).then(function(e){n.showSuccessMsg("Profile Updated successfully"),r.goToUserProfile()},function(e){n.onApiResponseError(e)})}}])}();