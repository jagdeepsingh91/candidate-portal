(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.apply-to-position.applyToPositionController',[
        '$scope',
        '$state',
        '$stateParams',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.services.navigationService',
        function ($scope, $state, $stateParams, apiUrlConfig, apiMethods, commonService, navigationService) {
            $scope.positionId = $stateParams.id;
            $scope.callbackFn = $state.params.callback;

            $scope.applyToPositionObj = {};
        }
    ]);
})();