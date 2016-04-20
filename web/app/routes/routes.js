(function () {
    angular.module('candidatePortal.application').config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    params : {callback : null},
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.login.loginController',
                            templateUrl: 'app/modules/login/login.tpl.html'
                        }
                    },
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            // you can lazy load files for an existing module
                            return $ocLazyLoad.load([
                                'userModel',
                                'loginController'
                            ]);
                        }]
                    }
                })
                .state('signUp', {
                    url: '/sign-up',
                    params : {callback : null},
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.signUp.signUpController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/signUp/signUp.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'userModel',
                                'signUpController'
                            ]);
                        }]
                    }
                })
                //.state('signUp.termAndCondition', {
                //    url: '/terms-and-conditions',
                //    views: {
                //        "": {
                //            templateUrl: 'web/app/modules/signUp/terms-condition/terms-condition.tpl.html'
                //        }
                //    }
                //    //resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                //    //    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                //    //        return $ocLazyLoad.load([
                //    //            'userModel',
                //    //            'signUpController'
                //    //        ]);
                //    //    }]
                //    //}
                //})
                .state('home', {
                    url: '/home',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.home.homeController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/home/home.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'positionModel',
                                'homeController'
                            ]);
                        }]
                    }
                })
                .state('home.profile', {
                    url: '/profile',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.profile.profileController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/profile/profile.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'applicantModel',
                                'profileController'
                            ]);
                        }]
                    }
                })
                .state('home.updateProfile', {
                    url: '/update-profile',
                    params : {userObj : null},
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.update-profile.updateProfileController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/update-profile/update-profile.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'applicantModel',
                                'updateProfileController'
                            ]);
                        }]
                    }
                })
                .state('home.myApplications', {
                    url: '/my-applications',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.my-applications.myApplicationsController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/my-applications/my-applications.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'positionModel',
                                'myApplicationsController'
                            ]);
                        }]
                    }
                })
                .state('home.openPositions', {
                    url: '/open-positions',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.open-position.openPositionController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/open-positions/open-positions.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'positionModel',
                                'openPositionController'
                            ]);
                        }]
                    }
                })
                .state('home.openPositions.positionsList', {
                    url: '/list',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.open-position.position-list.positionListController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/open-positions/position-list/position-list.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'positionListController'
                            ]);
                        }]
                    }
                })
                .state('home.openPositions.positionDetails', {
                    url: '/:id/details',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.open-position.position-details.positionDetailsController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/open-positions/position-details/position-details.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'positionDetailsController'
                            ]);
                        }]
                    }
                })
                .state('home.apply', {
                    url: '/apply-to-position/:id',
                    params : {callback : null},
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.apply-to-position.applyToPositionController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/apply-to-position/apply-to-position.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'applicantModel',
                                'applyToPositionController'
                            ]);
                        }]
                    }
                })
                .state('home.apply.uploadResume', {
                    url: '/upload-resume',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.apply-to-position.upload-resume.uploadResumeController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/apply-to-position/upload-resume/upload-resume.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'uploadResumeController'
                            ]);
                        }]
                    }
                })
                .state('home.apply.applicationForm', {
                    url: '/application-form',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.apply-to-position.application-form.applicationFormController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/apply-to-position/application-form/application-form.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'applicationFormController'
                            ]);
                        }]
                    }
                })
                .state('forgotPassword', {
                    url: '/forgot-password',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.forgot-password.forgotPasswordController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/forgot-password/forgot-password.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'forgotPasswordController'
                            ]);
                        }]
                    }
                })
                .state('home.changePassword', {
                    url: '/change-password',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.change-password.changePasswordController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/change-password/change-password.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'changePasswordController'
                            ]);
                        }]
                    }
                })
                .state('resetPassword', {
                    url: '/reset-password/:uuid',
                    views: {
                        "": {
                            controller: 'candidatePortal.modules.change-password.changePasswordController', // This view will use AppCtrl loaded below in the resolve
                            templateUrl: 'app/modules/change-password/change-password.tpl.html'
                        }
                    },
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'changePasswordController'
                            ]);
                        }]
                    }
                });
            $urlRouterProvider.when('','/home/open-positions/list');
            //$locationProvider.html5Mode(true);
            //$urlRouterProvider.otherwise('/home');
        }
    ]);
})();