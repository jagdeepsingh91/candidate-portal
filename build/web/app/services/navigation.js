!function(){angular.module("candidatePortal.application").factory("candidatePortal.services.navigationService",["$state",function(o){var i=function(){o.go("home.profile")},n=function(){o.go("home.changePassword")},e=function(){o.go("forgotPassword")},t=function(){o.go("home.updateProfile")},a=function(i){o.go("signUp",{callback:i})},g=function(i){o.go("login",{callback:i})},s=function(){o.go("home")},c=function(){o.go("home.apply.applicationForm")},p=function(){o.go("home.apply.uploadResume")},l=function(){o.go("home.openPositions.positionsList",{},{reload:!0})},u=function(i){o.go("home.openPositions.positionDetails",{id:i})},r=function(){o.go("home.myApplications")},f=function(i,n){o.go("home.apply.uploadResume",{id:i,callback:n})};return{goToUserProfile:i,goToSignUpView:a,goToLoginView:g,goToHomeView:s,goToApplicationForm:c,goToUploadResume:p,goToOpenPositionsList:l,goToOpenPositionDetails:u,goToMyApplications:r,goToApplyPosition:f,goToUpdateProfile:t,goToChangePassword:n,goToForgotPassword:e}}])}();