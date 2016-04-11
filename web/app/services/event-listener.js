(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.eventListener',[
        '$rootScope',
        '$state',
        '$location',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        function ($rootScope, $state, $location, commonService, navigationService) {

            var nonAccessibleStatesWithoutLogin = [
                "home.updateProfile",
                "home.apply",
                "home.apply.uploadResume",
                "home.apply.applicationForm",
                "home.changePassword"
            ];

            var nonAccessibleStatesWithLogin = [
                "login",
                "forgotPassword",
                "signUp"
            ];

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    console.log("from state", fromState.name);
                    console.log("to State", toState.name);
                    console.log("on state change params", toParams);

                    if($rootScope.loggedInStatus && nonAccessibleStatesWithLogin.indexOf(toState.name) != -1){
                        event.preventDefault();
                        commonService.showInfoMsg("Unauthorized access");
                        if(fromState.name == "" || fromState.name == null){
                            navigationService.goToOpenPositionsList();
                        }
                    }
                    else if(!$rootScope.loggedInStatus && nonAccessibleStatesWithoutLogin.indexOf(toState.name) != -1){
                        event.preventDefault();
                        commonService.showInfoMsg("Unauthorized access");
                        if(fromState.name == "" || fromState.name == null){
                            navigationService.goToOpenPositionsList();
                        }
                    }
                }
            );
            $rootScope.$on('$stateChangeError',
                function(event, unFoundState, fromState, fromParams) {
                    console.log("state not found");
                    console.log(unFoundState);
                    console.log(fromState);

                }
            );

            return {};
        }
    ]);
})();
