(function () {
    angular.module('candidatePortal.application').controller('candidatePortal.modules.home.homeController',[
        '$scope',
        '$state',
        'candidatePortal.services.navigationService',
        'candidatePortal.services.localStorageService',
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.models.positionModel',
        function ($scope, $state, navigationService, localStorageService, apiUrlConfig, apiMethods, commonService, positionModel) {

            console.log($state);
            if($state.current.name == "home.openPositions.positionsList")
                $scope.currentView = "position";
            $scope.onOpenPositionClick = function () {
                $scope.currentView = "position";
                navigationService.goToOpenPositionsList();
            };

            $scope.onMyApplicationsClick = function () {
                $scope.currentView = "application";
                navigationService.goToMyApplications();
            };

            $scope.onMyProfileClick = function () {
                $scope.currentView = "profile";
                navigationService.goToUserProfile();
            };

            $scope.onChangePasswordClick = function () {
                navigationService.goToChangePassword();
            };

            $scope.onLogoutClick = function () {
                var url = apiUrlConfig.userLogout;
                apiMethods.apiPOSTReq(url).then(function (response) {
                    localStorageService.doLogOut();
                    navigationService.goToOpenPositionsList();
                }, function (response) {
                    localStorageService.doLogOut();
                    commonService.onApiResponseError(response);
                });
            };

            $scope.onLoginClick = function () {
                var callback = function () {
                    navigationService.goToOpenPositionsList();
                };
                navigationService.goToLoginView(callback);
            };

            var getPositionFields = function () {
                var url = apiUrlConfig.positionFields;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.positionFieldsObj = positionModel.digestPositionFieldsApiObj(response.data.response);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            getPositionFields();

            var getDepartmentList = function () {
                var url = apiUrlConfig.getProfileMasterList("departments");
                apiMethods.apiGETReq(url, null, false).then(function (response) {
                    $scope.departmentsList = response.data.response;
                }, function (response) {
                    console.log("Error in fetching employer list. reason :", response);
                });
            };
            getDepartmentList();

            var getLocationsList = function () {
                var url = apiUrlConfig.getProfileMasterList("location");
                apiMethods.apiGETReq(url, null, false).then(function (response) {
                    $scope.locationsList = response.data.response;
                }, function (response) {
                    console.log("Error in fetching employer list. reason :", response);
                });
            };
            getLocationsList();

            var getSkillsList = function () {
                var url = apiUrlConfig.getProfileMasterList("skills");
                apiMethods.apiGETReq(url, null, false).then(function (response) {
                    $scope.skillsList = response.data.response;
                }, function (response) {
                    console.log("Error in fetching employer list. reason :", response);
                });
            };
            getSkillsList();

            var getBranchList = function () {
                var url = apiUrlConfig.getProfileMasterList("branches");
                apiMethods.apiGETReq(url, null, false).then(function (response) {
                    $scope.branchList = response.data.response;
                }, function (response) {
                    console.log("Error in fetching employer list. reason :", response);
                });
            };
            getBranchList();

            var getDegreeList = function () {
                var url = apiUrlConfig.getProfileMasterList("degrees");
                apiMethods.apiGETReq(url, null, false).then(function (response) {
                    $scope.degreeList = response.data.response;
                }, function (response) {
                    console.log("Error in fetching employer list. reason :", response);
                });
            };
            getDegreeList();
        }
    ]);
})();