(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.open-position.openPositionController',[
        '$q',
        '$scope',
        '$rootScope',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        'candidatePortal.models.positionModel',
        function ($q, $scope, $rootScope, apiUrlConfig, apiMethods, commonService, navigationService, positionModel) {
            $scope.orderOptionsList = [
                {type : "Ascending", value : true},
                {type : "Descending", value : false}
            ];

            var getPositionList = function () {
                var url = apiUrlConfig.positionList;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.positionsList = positionModel.digestPositionApiObj(response.data.response);
                    console.log($scope.positionsList);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            getPositionList();

            $scope.onApplyPositionClick = function (item, view) {
                if(!$rootScope.loggedInStatus){
                    var callback = function () {
                        navigationService.goToOpenPositionsList();
                    };
                    navigationService.goToLoginView(callback);
                    return;
                }
                var isApplicantExistUrl = apiUrlConfig.isApplicantCreated;
                apiMethods.apiGETReq(isApplicantExistUrl).then(function (response) {
                    if(!response.data.response){
                        var callback;
                        if(view == 'listView') {
                            callback = function () {
                                navigationService.goToOpenPositionsList();
                            };
                        }
                        else{
                            callback = function () {
                                navigationService.goToOpenPositionDetails(item.positionId);
                            };
                        }
                        navigationService.goToApplyPosition(item.positionId, callback);
                    }
                    else{
                        applyToPositionDirectly(item);
                    }
                }, function (response) {
                    commonService.onApiResponseError(response);
                });

            };

            var applyToPositionDirectly = function (obj) {
                getApplicantProfile().then(function (response) {
                    response.applicantPositionId = obj.positionId;
                    applyToPositionNow(response, obj);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };

            var applyToPositionNow = function (request, obj) {
                var url = apiUrlConfig.createApplicantProfile;
                apiMethods.apiPOSTReq(url, request).then(function (response) {
                    obj.applicantStatus = "Applied";
                    commonService.showSuccessMsg("Applied to position");
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };

            var getApplicantProfile = function () {
                var deferred = $q.defer();
                var url = apiUrlConfig.getApplicantProfile;
                apiMethods.apiGETReq(url).then(function (response) {
                    deferred.resolve(response.data.response);
                }, function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

        }
    ]);
})();