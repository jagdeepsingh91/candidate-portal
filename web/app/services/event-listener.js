(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.eventListener',[
        '$rootScope',
        '$state',
        '$location',
        'candidatePortal.services.commonService',
        function ($rootScope, $state, $location, commonService) {

            var nonAccessibleStatesWithoutLogin = [
                "home.updateProfile",
                "home.apply",
                "home.apply.uploadResume",
                "home.apply.applicationForm",
                "home.changePassword"
            ];

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    console.log("from state", fromState.name);
                    console.log("to State", toState.name);
                    console.log("on state change params", toParams);

                    var getSwitchCaseValue = function (state) {
                        console.log(toState.name.startsWith(state) ? toState.name : "");
                        return toState.name.startsWith(state) ? toState.name : "";
                    };

                    if($rootScope.loggedInStatus){
                        switch (toState.name){
                            case getSwitchCaseValue("login") :
                                event.preventDefault();
                                commonService.showInfoMsg("Unauthorized access");
                                break;

                            case getSwitchCaseValue("forgotPassword") :
                                event.preventDefault();
                                commonService.showInfoMsg("Unauthorized access");
                                break;

                            case getSwitchCaseValue("signUp") :
                                event.preventDefault();
                                commonService.showInfoMsg("Unauthorized access");
                                break;
                        }
                    }
                    else{
                        if(nonAccessibleStatesWithoutLogin.indexOf(toState.name) != -1){
                            event.preventDefault();
                            commonService.showInfoMsg("Unauthorized access");
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
