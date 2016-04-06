(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.open-position.position-list.positionListController',[
        '$q',
        '$scope',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        'candidatePortal.models.positionModel',
        function ($q, $scope, apiUrlConfig, apiMethods, commonService, navigationService, positionModel) {
            $scope.positionSearchObj = {};

            $scope.goToPositionDetails = function (item) {
                navigationService.goToOpenPositionDetails(item.positionId);
            };

            $scope.onSearchClick = function () {
                var req = {
                    departmentId : $scope.positionSearchObj.selectedDepartment,
                    locationId : $scope.positionSearchObj.selectedLocation,
                    skillId : $scope.positionSearchObj.selectedSkill
                };
                var url = apiUrlConfig.positionList;
                apiMethods.apiGETReq(url, req).then(function (response) {
                    $scope.positionsList = positionModel.digestPositionApiObj(response.data.response);
                    console.log($scope.positionsList);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
        }
    ]);
})();