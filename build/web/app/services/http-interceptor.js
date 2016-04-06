(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.myHttpInterceptor',[
        '$q',
        '$injector',
        'candidatePortal.services.commonService',
        function ($q, $injector, commonService) {
            return {
                // optional method
                'request': function (config) {
                    // do something on success
                    if(config.showLoadingBar)
                        commonService.showLoading();
                    return config;
                },

                // optional method
                'requestError': function (rejection) {
                    // do something on error
                    var $http = $http || $injector.get( '$http' );
                    if(!$http.pendingRequests.length)
                        commonService.hideLoading();
                    return $q.reject(rejection);
                },


                // optional method
                'response': function (response) {
                    // do something on success
                    var $http = $http || $injector.get( '$http' );
                    if(!$http.pendingRequests.length)
                        commonService.hideLoading();
                    return response;
                },

                // optional method
                'responseError': function (rejection) {
                    console.log("On Failure");
                    console.log(rejection);
                    // do something on error
                    var $http = $http || $injector.get( '$http' );
                    if(!$http.pendingRequests.length)
                        commonService.hideLoading();
                    if(rejection.data != null && rejection.data != undefined) {
                        if (rejection.data.message == "Access Denied") {
                            //permissionsService.doLogOut();
                        }
                    }
                    if(rejection.status == 0){
                        //permissionsService.doLogOut();
                        //commonService.showErrorMsg("Session Timeout! Please Login to continue.");
                    }
                    return $q.reject(rejection);
                }
            };
        }
    ]);
})();

