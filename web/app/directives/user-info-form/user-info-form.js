(function () {
    angular.module('candidatePortal.application').directive('userInfoForm',[
        'candidatePortal.services.apiUrlConfig',
        'candidatePortal.services.apiMethods',
        'candidatePortal.services.commonService',
        'candidatePortal.models.applicantModel',
        function (apiUrlConfig, apiMethods, commonService, applicantModel) {
            return {
                restrict: 'AE',
                scope: {
                    submitCallback : '=?',
                    cancelCallback : '=?',
                    fieldsObj : '=?'
                },
                templateUrl : "app/directives/user-info-form/user-form.tpl.html",
                link: function(scope, element, attrs) {

                    scope.onUpdateApplicantClick  = function () {
                        if(scope.userProfileForm.$invalid){
                            if(scope.userProfileForm.$error.required){
                                scope.userProfileForm.$error.required.forEach(function(field){
                                    field.$error.required.forEach(function (innerElement) {
                                        innerElement.$setDirty();
                                    });
                                });
                            }
                            if(scope.userProfileForm.$error.pattern){
                                scope.userProfileForm.$error.pattern.forEach(function(field){
                                    if(field.$invalid){
                                        field.$error.pattern.forEach(function (innerElement) {
                                            innerElement.$setDirty();
                                        });
                                    }
                                });
                            }
                            commonService.showErrorMsg("Form is incomplete");
                            return false;
                        }

                        var url = apiUrlConfig.createApplicantProfile;
                        var req = applicantModel.convertApplicantUi2ApiObj(scope.fieldsObj);
                        apiMethods.apiPOSTReq(url, req).then(function (response) {
                            if(scope.submitCallback)
                                scope.submitCallback(response);
                        }, function (response) {
                            commonService.onApiResponseError(response);
                        });
                    };

                    scope.onCancelClick = function () {
                        if(scope.cancelCallback)
                            scope.cancelCallback();
                    };
                }
            }
        }
    ]);
})();