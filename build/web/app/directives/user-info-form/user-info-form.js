!function(){angular.module("candidatePortal.application").directive("userInfoForm",["candidatePortal.models.applicantModel",function(e){return{restrict:"AE",scope:{formName:"=",userDetailObj:"=?",onSubmitCallback:"=?",locationsList:"=?",skillsList:"=?",branchList:"=?",degreeList:"=?"},templateUrl:"app/directives/user-info-form/user-form.tpl.html",link:function(i,t,o){console.log(i.userDetailObj),console.log(i.locationsList),i.userDetailObj||(i.userDetailObj=e.digestApplicantApiObj({})),i.yearsList=[];var a=(new Date).getFullYear();console.log(a);for(var l=1960;a>=l;l++)i.yearsList.push(l);i.addEducation=function(){i.userDetailObj.educationDetails.push({})},i.removeEducation=function(e){var t=i.userDetailObj.educationDetails.indexOf(e);-1!=t&&i.userDetailObj.educationDetails.splice(t,1)},i.addCompany=function(){i.userDetailObj.employmentHistoryDetails.push({})},i.removeCompany=function(e){console.log(e),console.log(i.userDetailObj.employmentHistoryDetails);var t=i.userDetailObj.employmentHistoryDetails.indexOf(e);-1!=t&&i.userDetailObj.employmentHistoryDetails.splice(t,1)},jQuery(document).ready(function(e){e(".datepicker").datepicker(),e(".icon-calendar").click(function(){console.log("hehe"),e(this).prev().datepicker("show"),e(".datepicker-inline").remove()})})}}}])}();