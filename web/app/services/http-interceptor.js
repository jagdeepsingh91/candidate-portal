(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.myHttpInterceptor',[
        '$q',
        '$window',
        '$injector',
        'candidatePortal.services.commonService',
        'candidatePortal.services.localStorageService',
        function ($q, $window, $injector, commonService, localStorageService) {
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
                    console.log(rejection.status);
                    // do something on error
                    var $http = $http || $injector.get( '$http' );
                    if(!$http.pendingRequests.length)
                        commonService.hideLoading();
                    if(rejection.data != null && rejection.data != undefined) {
                        if (rejection.data.message == "Access Denied") {
                            //permissionsService.doLogOut();
                        }
                    }
                    if(rejection.status == -1){
                        var navigationService = $injector.get('candidatePortal.services.navigationService');
                        localStorageService.doLogOut();
                        var callback = function () {
                            $window.history.back();
                        };
                        navigationService.goToLoginView(callback);
                        commonService.showErrorMsg("Session Expired! Please login to continue.", 5000);
                    }
                    return $q.reject(rejection);
                }
            };
        }
    ]);
})();

