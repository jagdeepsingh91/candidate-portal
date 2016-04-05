(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.navigationService',[
        '$state',
        function ($state) {

            var goToUserProfile = function () {
                $state.go("home.profile");
            };

            var goToChangePassword = function () {
                $state.go("home.changePassword");
            };

            var goToForgotPassword = function () {
                $state.go("forgotPassword");
            };

            var goToUpdateProfile = function () {
                $state.go("home.updateProfile");
            };

            var goToSignUpView = function (callbackFn) {
                $state.go("signUp", {callback : callbackFn});
            };

            var goToLoginView = function (callbackFn) {
                $state.go("login", {callback : callbackFn});
            };

            var goToHomeView = function () {
                $state.go("home");
            };

            var goToApplicationForm = function () {
                $state.go("home.apply.applicationForm");
            };

            var goToUploadResume = function () {
                $state.go("home.apply.uploadResume");
            };

            var goToOpenPositionsList = function () {
                $state.go("home.openPositions.positionsList",{}, {reload: true});
            };

            var goToOpenPositionDetails = function (id) {
                $state.go("home.openPositions.positionDetails", {id : id});
            };

            var goToMyApplications = function () {
                $state.go("home.myApplications");
            };
            
            var goToApplyPosition = function (id, callbackFn) {
                $state.go("home.apply.uploadResume", {id : id, callback : callbackFn});
            };

            return {
                goToUserProfile : goToUserProfile,
                goToSignUpView : goToSignUpView,
                goToLoginView : goToLoginView,
                goToHomeView : goToHomeView,
                goToApplicationForm : goToApplicationForm,
                goToUploadResume : goToUploadResume,
                goToOpenPositionsList : goToOpenPositionsList,
                goToOpenPositionDetails : goToOpenPositionDetails,
                goToMyApplications : goToMyApplications,
                goToApplyPosition : goToApplyPosition,
                goToUpdateProfile : goToUpdateProfile,
                goToChangePassword : goToChangePassword,
                goToForgotPassword : goToForgotPassword
            };
        }
    ]);
})();