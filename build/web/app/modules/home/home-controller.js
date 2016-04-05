!function(){angular.module("candidatePortal.application").controller("candidatePortal.modules.home.homeController",["$scope","$state","candidatePortal.services.navigationService","candidatePortal.services.localStorageService","candidatePortal.services.apiUrlConfig","candidatePortal.services.apiMethods","candidatePortal.services.commonService","candidatePortal.models.positionModel",function(o,n,i,e,t,r,s,a){console.log(n),"home.openPositions.positionsList"==n.current.name&&(o.currentView="position"),o.onOpenPositionClick=function(){o.currentView="position",i.goToOpenPositionsList()},o.onMyApplicationsClick=function(){o.currentView="application",i.goToMyApplications()},o.onMyProfileClick=function(){o.currentView="profile",i.goToUserProfile()},o.onChangePasswordClick=function(){i.goToChangePassword()},o.onLogoutClick=function(){var o=t.userLogout;r.apiPOSTReq(o).then(function(o){e.doLogOut(),i.goToOpenPositionsList()},function(o){e.doLogOut(),s.onApiResponseError(o)})},o.onLoginClick=function(){var o=function(){i.goToOpenPositionsList()};i.goToLoginView(o)};var c=function(){var n=t.positionFields;r.apiGETReq(n).then(function(n){o.positionFieldsObj=a.digestPositionFieldsApiObj(n.data.response)},function(o){s.onApiResponseError(o)})};c();var l=function(){var n=t.getProfileMasterList("departments");r.apiGETReq(n,null,!1).then(function(n){o.departmentsList=n.data.response},function(o){console.log("Error in fetching employer list. reason :",o)})};l();var p=function(){var n=t.getProfileMasterList("location");r.apiGETReq(n,null,!1).then(function(n){o.locationsList=n.data.response},function(o){console.log("Error in fetching employer list. reason :",o)})};p();var u=function(){var n=t.getProfileMasterList("skills");r.apiGETReq(n,null,!1).then(function(n){o.skillsList=n.data.response},function(o){console.log("Error in fetching employer list. reason :",o)})};u();var f=function(){var n=t.getProfileMasterList("branches");r.apiGETReq(n,null,!1).then(function(n){o.branchList=n.data.response},function(o){console.log("Error in fetching employer list. reason :",o)})};f();var d=function(){var n=t.getProfileMasterList("degrees");r.apiGETReq(n,null,!1).then(function(n){o.degreeList=n.data.response},function(o){console.log("Error in fetching employer list. reason :",o)})};d()}])}();