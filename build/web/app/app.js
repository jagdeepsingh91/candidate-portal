(function () {
    //declare all modules and their dependencies.
    //angular.module('candidatePortal.common', []);
    var application = angular.module('candidatePortal.application', [
        'oc.lazyLoad',
        'ui.router'
    ]);
    application.config([
        '$ocLazyLoadProvider',
        '$httpProvider',
        function ($ocLazyLoadProvider,$httpProvider) {
            $httpProvider.interceptors.push('candidatePortal.services.myHttpInterceptor');
            $httpProvider.defaults.withCredentials = true;
            $ocLazyLoadProvider.config({
                debug: false,
                events: false,
                modules:[
                    //Controllers
                    {
                        name: 'homeController',
                        files: ['app/modules/home/home-controller.js']
                    },
                    {
                        name: 'headerController',
                        files: ['app/modules/header/header-controller.js']
                    },
                    {
                        name: 'loginController',
                        files: ['app/modules/login/login-controller.js']
                    },
                    {
                        name: 'profileController',
                        files: ['app/modules/profile/profile-controller.js']
                    },
                    {
                        name: 'changePasswordController',
                        files: ['app/modules/change-password/change-password-controller.js']
                    },
                    {
                        name: 'signUpController',
                        files: ['app/modules/signUp/signUp-controller.js']
                    },
                    {
                        name: 'applyToPositionController',
                        files: ['app/modules/apply-to-position/apply-to-position-controller.js']
                    },
                    {
                        name: 'uploadResumeController',
                        files: ['app/modules/apply-to-position/upload-resume/upload-resume-controller.js']
                    },
                    {
                        name: 'applicationFormController',
                        files: ['app/modules/apply-to-position/application-form/application-form-controller.js']
                    },
                    {
                        name: 'openPositionController',
                        files: ['app/modules/open-positions/open-position-controller.js']
                    },
                    {
                        name: 'positionListController',
                        files: ['app/modules/open-positions/position-list/position-list-controller.js']
                    },
                    {
                        name: 'positionDetailsController',
                        files: ['app/modules/open-positions/position-details/position-details-controller.js']
                    },
                    {
                        name: 'myApplicationsController',
                        files: ['app/modules/my-applications/my-applications-controller.js']
                    },
                    {
                        name: 'updateProfileController',
                        files: ['app/modules/update-profile/update-profile-controller.js']
                    },
                    {
                        name: 'forgotPasswordController',
                        files: ['app/modules/forgot-password/forgot-password-controller.js']
                    },
                    // Models
                    {
                        name: 'userModel',
                        files: ['app/models/user-model.js']
                    },
                    {
                        name: 'applicantModel',
                        files: ['app/models/applicant-model.js']
                    },
                    {
                        name: 'positionModel',
                        files: ['app/models/position-model.js']
                    },
                    // Directives
                    {
                        name: 'myValidation',
                        files: ['app/directives/validations.js']
                    },
                    {
                        name: 'simpleFileUpload',
                        files: ['app/directives/simple-file-upload.js']
                    },
                    {
                        name: 'quickFileUpload',
                        files: ['app/directives/quickfileupload.js']
                    },
                    {
                        name: 'userInfoForm',
                        files: ['app/directives/user-info-form/user-info-form.js']
                    },
                    {
                        name: 'multipleAutocomplete',
                        files: ['app/directives/autocomplete/multiple-autocomplete-field/multiple-autocomplete-field.js']
                    },
                    {
                        name: 'singleAutocomplete',
                        files: ['app/directives/autocomplete/single-autocomplete-field/single-autocomplete-field.js']
                    },
                    {
                        name: 'stringToNumber',
                        files: ['app/directives/string-to-number.js']
                    },
                    {
                        name: 'setModelValue',
                        files: ['app/directives/set-model-value.js']
                    },
                    // Services
                    {
                        name: 'commonService',
                        files: ['app/services/common-services.js']
                    },
                    {
                        name: 'apiMethods',
                        files: ['app/services/api-methods.js']
                    },
                    {
                        name: 'apiUrlConfig',
                        files: ['app/services/api-url-config.js']
                    },
                    // Filters
                    {
                        name : "filterPositionFields",
                        files : ['app/filters/filter-position-fields.js']
                    }
                ]
            });
        }
    ]);
    application.run([
        '$rootScope',
        '$ocLazyLoad',
        '$http',
        'candidatePortal.services.localStorageService',
        'candidatePortal.services.eventListener',
        'candidatePortal.services.myHttpInterceptor',
        function ($rootScope, $ocLazyLoad, $http, localStorageService, eventListener, myHttpInterceptor) {
            localStorageService.getUserDetails();
        }
    ]);
})();