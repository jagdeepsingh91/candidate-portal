(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.open-position.position-details.positionDetailsController',[
        '$scope',
        '$stateParams',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        'candidatePortal.models.positionModel',
        function ($scope, $stateParams, apiUrlConfig, apiMethods, commonService, navigationService, positionModel) {

            var positionId = $stateParams.id;
            $scope.onBackToPositionsClick = function () {
                //navigationService.goToOpenPositionsList();
                window.history.back();
            };

            var getPositionDetails = function () {
                var url = apiUrlConfig.getPositionDetails(positionId);
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.positionDetailsObj = positionModel.positionApiObj2UIObj(response.data.response);
                    $scope.positionDetailsObj.positionId = positionId;
                    console.log($scope.positionDetailsObj);
                    $scope.positionDetailsValueObj = positionModel.getPositionFieldsMappedValues($scope.positionFieldsObj,$scope.positionDetailsObj)
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            getPositionDetails();

            //$scope.onApplyClick = function () {
            //    var callback = function () {
            //        navigationService.goToOpenPositionDetails(positionId);
            //    };
            //    navigationService.goToApplyPosition(positionId, callback);
            //};
        }
    ]);
})();